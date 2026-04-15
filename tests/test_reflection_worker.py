import asyncio

from app.reflection.worker import ReflectionWorker


class FakeMemoryRepository:
    def __init__(self, recent_memory: list[dict]):
        self.recent_memory = recent_memory
        self.conclusion_updates: list[dict] = []
        self.theta_updates: list[dict] = []
        self.created_tasks: list[dict] = []
        self.pending_tasks: list[dict] = []
        self.processing_marks: list[int] = []
        self.completed_marks: list[int] = []
        self.failed_marks: list[dict] = []

    async def get_recent_for_user(self, user_id: str, limit: int = 8) -> list[dict]:
        return self.recent_memory[:limit]

    async def upsert_conclusion(self, **kwargs) -> dict:
        self.conclusion_updates.append(kwargs)
        return kwargs

    async def upsert_theta(self, **kwargs) -> dict:
        self.theta_updates.append(kwargs)
        return kwargs

    async def enqueue_reflection_task(self, user_id: str, event_id: str) -> dict:
        task = {
            "id": len(self.created_tasks) + 1,
            "user_id": user_id,
            "event_id": event_id,
            "status": "pending",
            "attempts": 0,
            "last_error": None,
        }
        self.created_tasks.append(task)
        return task

    async def get_pending_reflection_tasks(self, limit: int = 100) -> list[dict]:
        return [
            task
            for task in self.pending_tasks
            if task["status"] in {"pending", "processing"}
        ][:limit]

    async def mark_reflection_task_processing(self, task_id: int) -> dict:
        self.processing_marks.append(task_id)
        self._update_task_status(task_id=task_id, status="processing", last_error=None)
        return {"id": task_id, "status": "processing"}

    async def mark_reflection_task_completed(self, task_id: int) -> dict:
        self.completed_marks.append(task_id)
        self._update_task_status(task_id=task_id, status="completed", last_error=None)
        return {"id": task_id, "status": "completed"}

    async def mark_reflection_task_failed(self, task_id: int, error: str) -> dict:
        self.failed_marks.append({"id": task_id, "error": error})
        self._update_task_status(task_id=task_id, status="failed", last_error=error)
        return {"id": task_id, "status": "failed", "last_error": error}

    def _update_task_status(self, task_id: int, status: str, last_error: str | None) -> None:
        for task in self.pending_tasks:
            if int(task["id"]) == task_id:
                task["status"] = status
                task["last_error"] = last_error
                return


async def test_reflection_worker_consolidates_explicit_preference_update_in_background() -> None:
    repository = FakeMemoryRepository(
        recent_memory=[
            {
                "summary": (
                    "event=Reply in bullet points from now on.; memory_kind=semantic; memory_topics=reply,bullet,points; "
                    "response_language=en; preference_update=response_style:structured; "
                    "action=success; expression=- first\\n- second"
                )
            }
        ]
    )
    worker = ReflectionWorker(memory_repository=repository)

    result = await worker.reflect_user(user_id="u-1", event_id="evt-1")

    assert result is True
    assert repository.conclusion_updates == [
        {
            "user_id": "u-1",
            "kind": "response_style",
            "content": "structured",
            "confidence": 0.98,
            "source": "background_reflection",
            "supporting_event_id": "evt-1",
        }
    ]
    assert repository.theta_updates == []


async def test_reflection_worker_infers_preferred_role_from_repeated_role_usage() -> None:
    repository = FakeMemoryRepository(
        recent_memory=[
            {"summary": "role=executor; action=success; expression=Done one."},
            {"summary": "role=executor; action=success; expression=Done two."},
            {"summary": "role=executor; action=success; expression=Done three."},
            {"summary": "role=mentor; action=success; expression=Different path."},
        ]
    )
    worker = ReflectionWorker(memory_repository=repository)

    result = await worker.reflect_user(user_id="u-1", event_id="evt-role")

    assert result is True
    assert {
        "user_id": "u-1",
        "kind": "preferred_role",
        "content": "executor",
        "confidence": 0.76,
        "source": "background_reflection",
        "supporting_event_id": "evt-role",
    } in repository.conclusion_updates
    assert repository.theta_updates == [
        {
            "user_id": "u-1",
            "support_bias": 0.0,
            "analysis_bias": 0.0,
            "execution_bias": 1.0,
        }
    ]


async def test_reflection_worker_infers_concise_style_from_repeated_short_successful_outputs() -> None:
    repository = FakeMemoryRepository(
        recent_memory=[
            {"summary": "action=success; expression=Short answer one."},
            {"summary": "action=success; expression=Short answer two."},
            {"summary": "action=success; expression=Short answer three."},
            {"summary": "action=success; expression=Another short answer."},
        ]
    )
    worker = ReflectionWorker(memory_repository=repository)

    result = await worker.reflect_user(user_id="u-1", event_id="evt-2")

    assert result is True
    assert repository.conclusion_updates[0]["content"] == "concise"
    assert repository.conclusion_updates[0]["source"] == "background_reflection"


async def test_reflection_worker_skips_when_recent_memory_has_no_consistent_signal() -> None:
    repository = FakeMemoryRepository(
        recent_memory=[
            {"summary": "action=success; expression=This is a longer explanatory response that should not count as concise."},
            {"summary": "action=success; expression=- one\\n- two"},
        ]
    )
    worker = ReflectionWorker(memory_repository=repository)

    result = await worker.reflect_user(user_id="u-1", event_id="evt-3")

    assert result is False
    assert repository.conclusion_updates == []
    assert repository.theta_updates == []


async def test_reflection_worker_updates_theta_from_mixed_recent_roles() -> None:
    repository = FakeMemoryRepository(
        recent_memory=[
            {"summary": "role=analyst; action=success; expression=One."},
            {"summary": "role=analyst; action=success; expression=Two."},
            {"summary": "role=executor; action=success; expression=Three."},
            {"summary": "role=friend; action=success; expression=Four."},
        ]
    )
    worker = ReflectionWorker(memory_repository=repository)

    result = await worker.reflect_user(user_id="u-1", event_id="evt-theta")

    assert result is True
    assert repository.theta_updates == [
        {
            "user_id": "u-1",
            "support_bias": 0.25,
            "analysis_bias": 0.5,
            "execution_bias": 0.25,
        }
    ]


async def test_reflection_worker_enqueue_persists_durable_task() -> None:
    repository = FakeMemoryRepository(recent_memory=[])
    worker = ReflectionWorker(memory_repository=repository)

    result = await worker.enqueue(user_id="u-1", event_id="evt-queued")

    assert result is True
    assert repository.created_tasks == [
        {
            "id": 1,
            "user_id": "u-1",
            "event_id": "evt-queued",
            "status": "pending",
            "attempts": 0,
            "last_error": None,
        }
    ]


async def test_reflection_worker_recovers_pending_tasks_on_start() -> None:
    repository = FakeMemoryRepository(
        recent_memory=[
            {"summary": "role=analyst; action=success; expression=One."},
            {"summary": "role=analyst; action=success; expression=Two."},
            {"summary": "role=executor; action=success; expression=Three."},
        ]
    )
    repository.pending_tasks = [
        {
            "id": 7,
            "user_id": "u-1",
            "event_id": "evt-pending",
            "status": "pending",
            "attempts": 0,
            "last_error": None,
        }
    ]
    worker = ReflectionWorker(memory_repository=repository, queue_size=5)

    await worker.start()
    await asyncio.sleep(0.05)
    await worker.stop()

    assert repository.processing_marks == [7]
    assert repository.completed_marks == [7]
    assert repository.failed_marks == []
    assert repository.theta_updates == [
        {
            "user_id": "u-1",
            "support_bias": 0.0,
            "analysis_bias": 0.67,
            "execution_bias": 0.33,
        }
    ]
