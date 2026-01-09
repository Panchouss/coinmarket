from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

from src.config import settings

async_engin = create_async_engine(
    url=settings.DATABASE_URL_asyncpg,
    echo=True,
)

async_session_factory = async_sessionmaker(async_engin)

class Base(DeclarativeBase):
    repr_cols_num = 3 #количиство выводимых колонок в логах
    repr_cols = tuple() #выбрать отпределенную колонку

    def __repr__(self):
        cols = []
        for idx, col in enumerate(self.__table__.columns.keys()):
            if col in self.repr_cols or idx < self.repr_cols_num:
                cols.append(f"{col}={getattr(self, col)}")
        return f"<{self.__class__.__name__} {", ".join(cols)}>"

async def init_db():
    async with async_engin.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
