-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(255),
    "username" VARCHAR(255),
    "added" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usernames" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),

    CONSTRAINT "usernems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "password" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

