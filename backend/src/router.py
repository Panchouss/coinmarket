from fastapi import APIRouter
from sqlalchemy.sql.functions import user

from src.db.models import User
from src.db.request import tg_db
from src.init import cmc_client
from src.db.schemas import UserDep, UserIdDep, UserSchema

router = APIRouter()

@router.get("/cryptocurrencies")
async def get_cryptocurrencies():
    return await cmc_client.get_listings()

@router.get("/cryptocurrencies/{currency_id}")
async def get_cryptocurrency(currency_id: int):
    return await cmc_client.get_currensy(currency_id)

# @router.post("/api/{tg_id}")
# async def add_user(data: UserDep):
#     new_user = User(
#         tg_id=data.tg_id,
#         username=data.username
#     )
#     user = await tg_db.add_user(new_user.tg_id, new_user.username)
#     return user

@router.post("/adduser")
async def add_user(data: UserSchema):   # теперь tg_id + username в теле
    user = await tg_db.add_user(data.tg_id, data.username)
    return user

@router.get("/api/{tg_id}")
async def get_user(data: UserIdDep):
    user = await tg_db.get_user(user_id=data.tg_id)
    return user

