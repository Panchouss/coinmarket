import datetime
from sqlalchemy import text, BIGINT, String
from sqlalchemy.orm import Mapped, mapped_column
from typing import Annotated

from src.db.database import Base

created_at = Annotated[datetime.datetime, mapped_column(server_default=text("TIMEZONE('utc', now())"))]

class User(Base):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    tg_id: Mapped[int] = mapped_column(BIGINT)
    username: Mapped[str] = mapped_column(String(64))
    created_at: Mapped[created_at]

    repr_cols_num = 4


