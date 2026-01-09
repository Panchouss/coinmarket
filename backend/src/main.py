from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.db.database import init_db
from src.router import router as router_crypto
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    print("DB initialized")
    yield


app = FastAPI(title="СИСЬКИ", lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_crypto)



