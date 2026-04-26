"""Add utc_offset to aion_profile."""

from alembic import op
import sqlalchemy as sa


revision = "20260426_0012"
down_revision = "20260425_0011"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "aion_profile",
        sa.Column("utc_offset", sa.String(length=16), nullable=False, server_default="UTC+00:00"),
    )


def downgrade() -> None:
    op.drop_column("aion_profile", "utc_offset")
