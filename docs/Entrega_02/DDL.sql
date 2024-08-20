-- --------------------------------------------------------------------------------------
-- Data Criacao ...........: 19/08/2024                                                --
-- Autor(es) ..............: Algusto Caldas                                            --
-- Versao .................: 1.0                                                       --
-- Banco de Dados .........: PostgreSQL                                                --
-- Descricao ..............: Inclusão de CREATE TABLE de todas as tabelas do banco de dados. --
-- --------------------------------------------------------------------------------------

BEGIN TRANSACTION; 

CREATE TABLE Niveis (
    nivel SERIAL PRIMARY KEY,
    exp_para_subir int NOT NULL,
    aumento_saude int NOT NULL,
    aumento_dano int NOT NULL,
    aumento_outros int
);

CREATE TABLE Mapa (
    id SERIAL PRIMARY KEY,
    nome char(50) NOT NULL,
    descricao char(800),
    tipo char(50) NOT NULL,
    nivel_dificuldade int NOT NULL,
    conexoes char(800),
    recursos char(800)
);

CREATE TABLE Jogadores (
    id SERIAL PRIMARY KEY,
    nome char(50) NOT NULL,
    senha char(50) NOT NULL,
    nivel int NOT NULL,
    experiencia int NOT NULL,
    saude int NOT NULL,
    dano int NOT NULL,
    nivel_id int NOT NULL,
    warframe_descricao char(800),
    warframe_habilidades char(800),
    local_atual_id int NOT NULL,
    FOREIGN KEY (nivel_id) REFERENCES Niveis (nivel),
    FOREIGN KEY (local_atual_id) REFERENCES Mapa (id)
);

CREATE TABLE Armas (
    id SERIAL PRIMARY KEY,
    nome char(50) NOT NULL,
    descricao char(800),
    tipo char(50) NOT NULL,
    dano int NOT NULL,
    jogador_id int NOT NULL,
    FOREIGN KEY (jogador_id) REFERENCES Jogadores (id)
);

CREATE TABLE Missoes (
    id SERIAL PRIMARY KEY,
    nome char(50) NOT NULL,
    descricao char(800),
    dificuldade int NOT NULL,
    recompensa char(800),
    local_id int NOT NULL,
    jogador_id int NOT NULL,
    FOREIGN KEY (local_id) REFERENCES Mapa (id),
    FOREIGN KEY (jogador_id) REFERENCES Jogadores (id)
);

CREATE TABLE Itens (
    id SERIAL PRIMARY KEY,
    nome char(50) NOT NULL,
    descricao char(800),
    quantidade int NOT NULL,
    jogador_id int NOT NULL,
    local_id int NOT NULL,
    FOREIGN KEY (jogador_id) REFERENCES Jogadores (id),
    FOREIGN KEY (local_id) REFERENCES Mapa (id)
);

CREATE TABLE Aliados (
    id SERIAL PRIMARY KEY,
    nome char(50) NOT NULL,
    descricao char(800),
    nivel int NOT NULL,
    habilidades char(800),
    jogador_id int NOT NULL,
    relacao char(100),
    FOREIGN KEY (jogador_id) REFERENCES Jogadores (id)
);

CREATE TABLE Monstros (
    id SERIAL PRIMARY KEY,
    nome char(50) NOT NULL,
    descricao char(800),
    nivel int NOT NULL,
    tipo char(50) NOT NULL,
    dano int NOT NULL,
    vida int NOT NULL,
    habilidades char(800),
    local_id int NOT NULL,
    FOREIGN KEY (local_id) REFERENCES Mapa (id)
);

COMMIT;