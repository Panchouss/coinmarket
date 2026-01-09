from sqlalchemy import select
from fastapi import HTTPException


from src.db.database import async_session_factory
from src.db.models import User
from src.db.schemas import AllUsersSchema


class tg_db:
    @staticmethod
    async def add_user(user_id: int, name: str):
        async with async_session_factory() as session:
            stmt = select(User).where(User.tg_id == user_id)
            user = await session.scalar(stmt)
            if user:
                return user
            new_user = User(tg_id=user_id,username=name)
            session.add(new_user)
            await session.commit()
            await session.refresh(new_user)
            return new_user

    @staticmethod
    async def get_user(user_id: int):
        async with async_session_factory() as session:
            query = select(User).where(User.tg_id == user_id)
            user = await session.execute(query)
            result_user = user.scalar()
            print(f"{result_user=}")
            serialize_user = [
                AllUsersSchema.model_validate(result_user).model_dump()
            ]
            print(serialize_user)
            if not user:
                raise HTTPException (401, {"error":"Unautorized"})
            return serialize_user

