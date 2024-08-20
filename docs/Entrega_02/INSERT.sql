-- --------------------------------------------------------------------------------------
-- Data Criacao ...........: 19/08/2024                                                --
-- Autor(es) ..............: Taynara Marcellos                                            --
-- Versao .................: 1.0                                                       --
-- Banco de Dados .........: PostgreSQL                                                --
-- Descricao ..............: Inserindo dados em todas as tabelas do banco de dados. --
-- --------------------------------------------------------------------------------------

BEGIN TRANSACTION;


INSERT INTO Niveis (exp_para_subir, aumento_saude, aumento_dano, aumento_outros) VALUES
(100, 10, 5, 0),
(200, 15, 7, 2),
(300, 20, 10, 5),
(400, 25, 12, 8),
(500, 30, 15, 10);


INSERT INTO Mapa (nome, descricao, tipo, nivel_dificuldade, conexoes, recursos) VALUES
('Floresta Sombria', 'Uma floresta densa e cheia de mistérios.', 'Floresta', 3, 'Caminho do Norte, Caminho do Sul', 'Madeira, Frutas'),
('Montanhas Geladas', 'Um lugar gelado e perigoso.', 'Montanha', 5, 'Caminho do Leste', 'Minério, Gelo'),
('Deserto Escaldante', 'Um deserto vasto e inóspito.', 'Deserto', 4, 'Caminho do Oeste', 'Areia, Cactos'),
('Ruínas Antigas', 'Ruínas de uma civilização perdida.', 'Ruínas', 6, 'Caminho do Norte, Caminho do Leste', 'Artefatos, Pedras'),
('Cidade Abandonada', 'Uma cidade que foi esquecida pelo tempo.', 'Cidade', 7, 'Caminho do Sul', 'Recursos urbanas');


INSERT INTO Jogadores (nome, senha, nivel, experiencia, saude, dano, nivel_id, warframe_descricao, warframe_habilidades, local_atual_id) VALUES
('Excalibur', 'senha123', 1, 0, 100, 10, 1, 'Um Warframe balanceado e versátil.', 'Habilidade 1, Habilidade 2', 1),
('Mag', 'senha456', 2, 150, 120, 15, 2, 'Focada em manipulação magnética e controle.', 'Habilidade 3, Habilidade 4', 2),
('Rhino', 'senha789', 1, 50, 90, 8, 1, 'Um tanque poderoso com alta resistência.', 'Habilidade 5, Habilidade 6', 3),
('Volt', 'senha101', 3, 250, 130, 20, 3, 'Especialista em eletricidade e velocidade.', 'Habilidade 7, Habilidade 8', 4),
('Saryn', 'senha202', 2, 100, 110, 12, 2, 'Focada em toxicidade e dano em área.', 'Habilidade 9, Habilidade 10', 5);


INSERT INTO Armas (nome, descricao, tipo, dano, jogador_id) VALUES
('Espada Longa', 'Uma espada longa e afiada.', 'Espada', 15, 1),
('Arco Curto', 'Um arco que atira flechas com precisão.', 'Arma de Fogo', 10, 2),
('Machado de Guerra', 'Um machado pesado para combate.', 'Machado', 20, 3),
('Lança', 'Uma lança longa para ataques à distância.', 'Lança', 12, 4),
('Besta', 'Uma besta poderosa que atira flechas rápidas.', 'Arma de Fogo', 18, 5);


INSERT INTO Missoes (nome, descricao, dificuldade, recompensa, local_id, jogador_id) VALUES
('Resgate na Floresta', 'Resgatar um aliado perdido na floresta.', 2, '100 moedas', 1, 1),
('Caça ao Monstro', 'Caçar um monstro que aterroriza a cidade.', 3, '150 moedas', 2, 2),
('Exploração das Ruínas', 'Explorar as antigas ruínas em busca de tesouros.', 4, '200 moedas', 3, 3),
('Defesa da Cidade', 'Defender a cidade de uma invasão.', 5, '250 moedas', 4, 4),
('Coleta de Recursos', 'Coletar recursos no deserto.', 3, '50 moedas', 5, 5);


INSERT INTO Itens (nome, descricao, quantidade, jogador_id, local_id) VALUES
('Poção de Saúde', 'Recupera 50 pontos de saúde.', 10, 1, 1),
('Flechas', 'Flechas para uso com arco.', 30, 2, 2),
('Cura', 'Cura instantânea.', 5, 3, 3),
('Papel de Invocação', 'Usado para invocar aliados.', 2, 4, 4),
('Comida', 'Restaura a energia do jogador.', 20, 5, 5);


INSERT INTO Aliados (nome, descricao, nivel, habilidades, jogador_id, relacao) VALUES
('Loki', 'Um aliado astuto que pode se tornar invisível.', 2, 'Habilidade de furtividade', 1, 'Amigo'),
('Trinity', 'Aliada com poderes de cura e suporte.', 3, 'Habilidade de cura', 2, 'Familiar'),
('Nova', 'Aliada com habilidades de manipulação de antimateria.', 2, 'Habilidade de controle', 3, 'Comandante'),
('Wisp', 'Aliada que pode fornecer buffs e suporte.', 1, 'Habilidade de suporte', 4, 'Companheiro'),
('Nezha', 'Aliado ágil com habilidades de velocidade.', 4, 'Habilidade de velocidade', 5, 'Protetor');


INSERT INTO Monstros (nome, descricao, nivel, tipo, dano, vida, habilidades, local_id) VALUES
('Grineer', 'Uma raça militarizada de clones conhecidos por sua força e resistência.', 1, 'Terra', 5, 30, 'Furtividade', 1),
('Corpus', 'Uma facção tecnológica focada em lucro e comércio usando robôs e tropas humanas.', 3, 'Terra', 10, 50, 'Força', 2),
('Bosses', 'Inimigos poderosos que geralmente têm suas próprias missões e mecânicas de combate.', 5, 'Fogo', 20, 100, 'Sopro de Fogo', 3),
('Orokin', 'Inimigos que eram parte da antiga civilização Orokin frequentemente encontrados em Ruínas.', 2, 'Morto-Vivo', 7, 40, 'Resistência', 4),
('Sentients', 'Uma raça antiga e inteligente que se opõe aos Warframes adaptando-se a ataques.', 4, 'Mítico', 15, 80, 'Ataque Venenoso', 5);

COMMIT;
