CREATE DATABASE Developers_DataBase;

CREATE TYPE 'OS' AS ENUM ('Windows', 'Linux', 'MaxOS');

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
    'id' BIGSERIAL NOT NULL,
    'name' VARCHAR(30) NOT NULL
);

CREATE TABLE projects_technologies(
    'id' BIGSERIAL PRIMARY KEY,
    'addedIn' DATA NOT NULL 
);

INSERT INTO 
    technologies('name')
VALUES('JavaScript');

INSERT INTO 
    technologies('name')
VALUES('Python');

INSERT INTO 
    technologies('name')
VALUES('React');

INSERT INTO 
    technologies('name')
VALUES('Express.js');

INSERT INTO 
    technologies('name')
VALUES('HTML');

INSERT INTO 
    technologies('name')
VALUES('CSS');

INSERT INTO 
    technologies('name')
VALUES('Django');

INSERT INTO 
    technologies('name')
VALUES('PostgreSQL');

INSERT INTO 
    technologies('name')
VALUES('MongoDB ');