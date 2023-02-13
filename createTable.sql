CREATE DATABASE developers_database;

\c developers_database;

CREATE TYPE OS AS ENUM ('Windows', 'Linux', 'MaxOS');

CREATE TABLE developer_info(
    "id" SERIAL PRIMARY KEY,
    "developerSince" DATE NOT NULL,
    "preferredOS" OS NOT NULL
);

CREATE TABLE developers(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "aditionalInfoId" INTEGER UNIQUE,
    FOREIGN KEY ("aditionalInfoId") REFERENCES "developer_info" ("id") ON DELETE SET NULL
);

CREATE TABLE projects(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedTime" VARCHAR(20) NOT NULL,
    "repository" VARCHAR(120) NOT NULL,
    "starDate" DATE NOT NULL,
    "endDate" DATE,
    "developerId" INTEGER NOT NULL UNIQUE, 
    FOREIGN KEY ("developerId") REFERENCES "developers" ("id") ON DELETE SET NULL
);

CREATE TABLE technologies(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(30) NOT NULL
);

CREATE TABLE projects_technologies(
    "id" SERIAL PRIMARY KEY,
    "addedIn" DATE NOT NULL,
    "projectId" INTEGER UNIQUE,
    "technologyId" INTEGER,
    FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("technologyId") REFERENCES "technologies" ("id") ON DELETE SET NULL
);

INSERT INTO 
    technologies(name)
VALUES
    ('JavaScript'),
    ('Python'),
    ('React'),
    ('Express.js'),
    ('HTML'),
    ('CSS'),
    ('Django'),
    ('PostgreSQL'),
    ('MongoDB');