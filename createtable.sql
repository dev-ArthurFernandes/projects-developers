CREATE DATABASE Developers_DataBase;

\c developers_database;

CREATE TYPE OS AS ENUM ('Windows', 'Linux', 'MaxOS');

CREATE TABLE developer_info(
    'id' BIGSERIAL PRIMARY KEY,
    'developerSince' DATA NOT NULL,
    'preferredOS' OS
);

CREATE TABLE developers(
    'id' BIGSERIAL PRIMARY KEY,
    'name' VARCHAR(50) NOT NULL,
    'email' VARCHAR(50) NOT NULL
);

CREATE TABLE projects(
    'id' BIGSERIAL PRIMARY KEY,
    'name' VARCHAR(50) NOT NULL,
    'description' TEXT NOT NULL,
    'estimatedTime' VARCHAR(20) NOT NULL,
    'repository' VARCHAR(120) NOT NULL,
    'starDate' DATA not null,
    'endDate' DATA
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
