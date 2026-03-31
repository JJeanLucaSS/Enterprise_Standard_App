CREATE DATABASE sistema_servicos;
USE sistema_servicos;
CREATE TABLE usuarios (
    ID int NOT NULL ,
    Username varchar(95) NOT NULL,
    PRIMARY KEY (ID),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(55) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);