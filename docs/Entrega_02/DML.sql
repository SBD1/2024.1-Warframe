

INSERT INTO Jogadores (id_jogador, nome, nivel, local_atual_id, warframe_habilidades)
VALUES 
(1, 'Tenno1', 10, 101, 'Dash, Shield'),
(2, 'Tenno2', 15, 102, 'Invisibility, Speed'),
(3, 'Tenno3', 20, 103, 'Energy Blast, Heal');


INSERT INTO Missoes (id_missao, nome, descricao, local_id, id_jogador)
VALUES 
(1, 'Rescue Mission', 'Rescue hostages from enemy base', 101, 1),
(2, 'Sabotage Mission', 'Sabotage enemy weapons', 102, 2),
(3, 'Exterminate Mission', 'Eliminate all enemies in the area', 103, 3);


INSERT INTO Aliados (id_aliado, nome, nivel, id_jogador, habilidades)
VALUES 
(1, 'Ally1', 12, 1, 'Shield, Heal'),
(2, 'Ally2', 18, 2, 'Invisibility, Speed'),
(3, 'Ally3', 22, 3, 'Energy Blast, Dash');


INSERT INTO Monstros (id_monstro, nome, dano, tipo, local_id)
VALUES 
(1, 'Grineer Soldier', 50, 'Grineer', 101),
(2, 'Corpus Tech', 70, 'Corpus', 102),
(3, 'Infested Charger', 80, 'Infested', 103);


INSERT INTO Mapas (id_mapa, nome, nivel_dificuldade)
VALUES 
(101, 'Earth', 'Alta'),
(102, 'Mars', 'Media'),
(103, 'Saturn', 'Alta');

INSERT INTO Itens (id_item, nome, tipo, id_jogador)
VALUES 
(1, 'Boltor Prime', 'Arma', 1),
(2, 'Orthos Prime', 'Arma Branca', 2),
(3, 'Rhino Prime', 'Warframe', 3);


INSERT INTO Tipos_Itens (tipo)
VALUES 
('Arma'),
('Arma Branca'),
('Warframe');

INSERT INTO Equipamentos (id_equipamento, nome, dano, id_jogador)
VALUES 
(1, 'Excalibur', 100, 1),
(2, 'Loki', 80, 2),
(3, 'Rhino', 120, 3);


INSERT INTO Missao_Monstro (id_missao, id_monstro)
VALUES 
(1, 1),
(2, 2),
(3, 3);


INSERT INTO Habilidades_Jogador (id_jogador, habilidade)
VALUES 
(1, 'Dash'),
(1, 'Shield'),
(2, 'Invisibility'),
(2, 'Speed'),
(3, 'Energy Blast'),
(3, 'Heal');


INSERT INTO Habilidades_Aliado (id_aliado, habilidade)
VALUES 
(1, 'Shield'),
(1, 'Heal'),
(2, 'Invisibility'),
(2, 'Speed'),
(3, 'Energy Blast'),
(3, 'Dash');

