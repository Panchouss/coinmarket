from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, ConfigDict
from fastapi import Depends

class UserAddSchema(BaseModel):
    tg_id: int
    model_config = ConfigDict(from_attributes=True)

class UserSchema(UserAddSchema):
    username: str
    model_config = ConfigDict(from_attributes=True)

class AllUsersSchema(UserSchema):
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


UserDep = Annotated[UserSchema, Depends()]
UserIdDep = Annotated[UserAddSchema, Depends()]