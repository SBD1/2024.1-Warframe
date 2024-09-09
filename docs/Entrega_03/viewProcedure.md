| Versão |    Data    | Descrição               | Autor                                                                                                                 |
| :----: | :--------: | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `1.0`  | 07/09/2024 | Criação do documento de view e procedure | [Taynara Cristina](https://github.com/TaynaraCris)|
| `1.1` | 08/09/2024 | Adicionando view e procedure| [Taynara Cristina](https://github.com/TaynaraCris)
| `1.2` | 08/09/2024 | Adicionando view e procedure| [Algusto Caldas](https://github.com/Algusto-RC)

# Views

## View de Detalhes dos Jogadores

Esta View combina informações dos jogadores com seus níveis e a localização atual no mapa. Ela permite visualizar o status completo de cada jogador, incluindo os benefícios do nível e detalhes da região onde estão atualmente.

```sql
CREATE VIEW vw_jogadores_detalhes AS
SELECT 
    j.id AS jogador_id,
    j.nome AS nome_jogador,
    j.nivel,
    j.experiencia,
    j.saude,
    j.dano,
    n.exp_para_subir,
    n.aumento_saude,
    n.aumento_dano,
    n.aumento_outros,
    m.id AS local_atual_id,
    m.nome AS local_atual_nome,
    m.tipo AS tipo_mapa
FROM Jogadores j
JOIN Niveis n ON j.nivel_id = n.nivel
JOIN Mapa m ON j.local_atual_id = m.id;
Consulta para Visualizar os Detalhes dos Jogadores

SELECT * FROM vw_jogadores_detalhes;

View de Inventário dos Jogadores
Esta View reúne os itens e equipamentos que cada jogador possui, facilitando o gerenciamento do inventário e a visualização dos recursos disponíveis.


CREATE VIEW vw_inventario_jogadores AS
SELECT 
    j.id AS jogador_id,
    j.nome AS nome_jogador,
    i.id AS item_id,
    i.nome AS item_nome,
    i.descricao AS item_descricao,
    i.quantidade,
    e.id_equipamento AS equipamento_id,
    e.nome AS equipamento_nome,
    e.dano AS equipamento_dano
FROM Jogadores j
LEFT JOIN Itens i ON j.id = i.jogador_id
LEFT JOIN Equipamentos e ON j.id = e.id_jogador;
Consulta para Visualizar o Inventário dos Jogadores

SELECT * FROM vw_inventario_jogadores
WHERE jogador_id = 1;

## Criação da View monstros_mortos

Este bloco cria uma view chamada monstros_mortos, que lista os monstros cuja vida é menor ou igual a zero. Etsá view é utilizada para verificar se o monstro está vivo, e caso o contrário reviver ele em reviver_monstros.

```sql
CREATE VIEW monstros_mortos AS
    SELECT id, nome, nivel
    FROM Monstros
    WHERE vida <= 0;
````

## Consulta para Visualizar os Monstros Mortos

Esta consulta permite visualizar os dados da view monstros_mortos.

```sql
SELECT * FROM monstros_mortos;
```

## Remoção da View

Este comando remove a view monstros_mortos, caso ela exista.

```sql
DROP VIEW IF EXISTS monstros_mortos;
```

## Criação da View missoes_por_jogador

Defini a missão de cada jogador.

```sql
CREATE VIEW missoes_por_jogador AS
    SELECT j.nome AS jogador_nome, m.nome AS missao_nome, m.dificuldade, m.recompensa
    FROM Jogadores j
    JOIN Missoes m ON j.id = m.jogador_id;
```

## Consulta para Visualizar as Missões por Jogador

Esta consulta permite visualizar os dados da view missoes_por_jogador.

```sql
SELECT * FROM missoes_por_jogador;
```

## Remoção da View

Este comando remove a view missoes_por_jogador, caso ela exista.

```sql
DROP VIEW IF EXISTS missoes_por_jogador;
```
## Criação da View monstros_por_local

Mostrar posição dos monstros por local.

```sql
CREATE VIEW monstros_por_local AS
    SELECT l.nome AS local_nome, m.nome AS monstro_nome, m.nivel, m.dano, m.vida, m.habilidades
    FROM Mapa l
    JOIN Monstros m ON l.id = m.local_id;
```

## Consulta para Visualizar os Montros por Local

Esta consulta permite visualizar os dados da view monstros_por_local.

```sql
SELECT * FROM monstros_por_local;
```

## Remoção da View

Este comando remove a view monstros_por_local, caso ela exista.

```sql
DROP VIEW IF EXISTS monstros_por_local;
```

# QUERIES

## Consulta para Visualizar os Monstros Mortos

Aqui está novamente a consulta para visualizar os dados da view monstros_mortos.

```sql
SELECT * FROM monstros_mortos;
```

# PROCEDURES

## Procedimento para Inserir Jogador

Este procedimento `inserir_jogador` adiciona um novo jogador à tabela `Jogadores`.

```sql
CREATE OR REPLACE PROCEDURE inserir_jogador(
    p_nome TEXT,
    p_senha TEXT,
    p_nivel INT,
    p_experiencia INT,
    p_saude INT,
    p_dano INT,
    p_nivel_id INT,
    p_warframe_descricao TEXT,
    p_warframe_habilidades TEXT,
    p_local_atual_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Jogadores (nome, senha, nivel, experiencia, saude, dano, nivel_id, warframe_descricao, warframe_habilidades, local_atual_id)
    VALUES (p_nome, p_senha, p_nivel, p_experiencia, p_saude, p_dano, p_nivel_id, p_warframe_descricao, p_warframe_habilidades, p_local_atual_id);

    RAISE NOTICE 'Jogador % foi inserido com sucesso.', p_nome;
END;
$$;
```

### Chamada do Procedimento para Inserir Jogador

Esta linha chama o procedimento `inserir_jogador`, passando os dados do jogador.

```sql
CALL inserir_jogador('nome', 'senha', 1, 0, 100, 10, 1, 'descrição', 'habilidades', 1);
```

### Remoção do Procedimento

Remove o procedimento `inserir_jogador`, caso ele exista.

```sql
DROP PROCEDURE IF EXISTS inserir_jogador(
    p_nome TEXT,
    p_senha TEXT,
    p_nivel INT,
    p_experiencia INT,
    p_saude INT,
    p_dano INT,
    p_nivel_id INT,
    p_warframe_descricao TEXT,
    p_warframe_habilidades TEXT,
    p_local_atual_id INT);
```

---

## Procedimento para Reviver Monstros

Este procedimento reviver_monstros reviverá os monstros mortos no mapa atual do jogador.

```sql
CREATE OR REPLACE PROCEDURE reviver_monstros(jogador_id INT)
LANGUAGE plpgsql
AS $$
DECLARE
    mapa_atual_id INT;
BEGIN
    SELECT local_atual_id INTO mapa_atual_id
    FROM Jogadores
    WHERE id = jogador_id;

    IF EXISTS (
        SELECT 1
        FROM Monstros
        WHERE vida <= 0
        AND local_id = mapa_atual_id
    ) THEN
        UPDATE Monstros
        SET vida = nivel * 10
        WHERE vida <= 0
        AND local_id = mapa_atual_id;
        
        RAISE NOTICE 'Monstros revividos no mapa %', mapa_atual_id;
    ELSE
        RAISE NOTICE 'Nenhum monstro morto encontrado no novo mapa.';
    END IF;
END;
$$;
```

## Chamada do Procedimento para Reviver Monstros

Esta linha chama o procedimento reviver_monstros, passando o ID do jogador.

```sql
CALL reviver_monstros(id);
```

## Remoção do Procedimento
Remove o procedimento reviver_monstros, caso ele exista.

```sql
DROP PROCEDURE IF EXISTS reviver_monstros(jogador_id INT);
```

## Procedimento para Ganhar Experiência em Missões

Este procedimento ganhar_experiencia_missao permite que um jogador ganhe experiência ao completar uma missão.

```sql
CREATE OR REPLACE PROCEDURE ganhar_experiencia_missao(jogador_id INT, missao_id INT)
LANGUAGE plpgsql
AS $$
DECLARE
    dificuldade_missao INT;
    local_id_missao INT;
    dificuldade_mapa INT;
    experiencia_ganha INT;
BEGIN
    SELECT dificuldade, local_id INTO dificuldade_missao, local_id_missao
    FROM Missoes
    WHERE id = missao_id;

    IF dificuldade_missao IS NULL THEN
        RAISE EXCEPTION 'Missão com ID % não encontrada.', missao_id;
    END IF;

    SELECT nivel_dificuldade INTO dificuldade_mapa
    FROM Mapa
    WHERE id = local_id_missao;

    IF dificuldade_mapa IS NULL THEN
        RAISE EXCEPTION 'Mapa com ID % não encontrado.', local_id_missao;
    END IF;

    experiencia_ganha := dificuldade_missao + dificuldade_mapa;

    UPDATE Jogadores
    SET experiencia = experiencia + experiencia_ganha
    WHERE id = jogador_id;

    RAISE NOTICE 'Jogador com ID % ganhou % de experiência ao completar a missão.', jogador_id, experiencia_ganha;
END;
$$;
```

## Chamada do Procedimento para Ganhar Experiência

Esta linha chama o procedimento ganhar_experiencia_missao, passando os IDs do jogador e da missão.

```sql
CALL ganhar_experiencia_missao(idJogador, idMissao);
```

## Remoção do Procedimento
Remove o procedimento ganhar_experiencia_missao, caso ele exista.

```sql
DROP PROCEDURE IF EXISTS ganhar_experiencia_missao(INT, INT);
```

## Procedimento para Utilizar Item
Esse procedimento permite que um jogador utilize um item e diminui sua quantidade no inventário. Se a quantidade do item chegar a zero, ele é removido do inventário.

```sql
CREATE OR REPLACE PROCEDURE usar_item(p_jogador_id INT, p_item_id INT)
LANGUAGE plpgsql
AS $$
DECLARE
    quantidade_atual INT;
BEGIN
    SELECT quantidade INTO quantidade_atual
    FROM Itens
    WHERE id = p_item_id AND jogador_id = p_jogador_id;

    IF quantidade_atual IS NULL THEN
        RAISE EXCEPTION 'Item com ID % não encontrado para o jogador %.', p_item_id, p_jogador_id;
    END IF;

    IF quantidade_atual > 0 THEN
        UPDATE Itens
        SET quantidade = quantidade - 1
        WHERE id = p_item_id AND jogador_id = p_jogador_id;

        RAISE NOTICE 'Jogador % usou o item % e agora tem % restantes.', p_jogador_id, p_item_id, quantidade_atual - 1;

        IF quantidade_atual - 1 = 0 THEN
            DELETE FROM Itens
            WHERE id = p_item_id AND jogador_id = p_jogador_id;
            RAISE NOTICE 'Item % foi removido do inventário do jogador %.', p_item_id, p_jogador_id;
        END IF;
    ELSE
        RAISE EXCEPTION 'Item % já está esgotado no inventário do jogador %.', p_item_id, p_jogador_id;
    END IF;
END;
$$;

```

## Chamada do Procedimento para Utilizar Item

Esta linha chama o procedimento usar_item, passando o ID do jogador e do item.

```sql
CALL usar_item(jogador_id INT, item_id INT);
```

Verificando o resultado da quantidade de itens do jogador 1 após o uso

```sql
SELECT nome, quantidade
FROM Itens
WHERE jogador_id = 1;
```
## Remoção do Item
Remove o procedimento usar_item, caso ele exista.

```sql
DROP PROCEDURE IF EXISTS usar_item(p_jogador_id INT, p_item_id INT);
```

## Procedimento para Inserir Missão

Este procedimento `inserir_missao` adiciona uma nova missão à tabela `Missoes`.

```sql
CREATE OR REPLACE PROCEDURE inserir_missao(
    p_nome TEXT,
    p_descricao TEXT,
    p_dificuldade INT,
    p_recompensa TEXT,
    p_local_id INT,
    p_jogador_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO Missoes (nome, descricao, dificuldade, recompensa, local_id, jogador_id)
    VALUES (p_nome, p_descricao, p_dificuldade, p_recompensa, p_local_id, p_jogador_id);

    RAISE NOTICE 'Missão % foi inserida com sucesso.', p_nome;
END;
$$;
```

### Chamada do Procedimento para Inserir Missão

Esta linha chama o procedimento `inserir_missao`, passando os dados da missão.

```sql
CALL inserir_missao('nome_missao', 'descrição', 3, 'recompensa', 1, 1);
```

### Remoção do Procedimento

Remove o procedimento `inserir_missao`, caso ele exista.

```sql
DROP PROCEDURE IF EXISTS inserir_missao(
    p_nome TEXT,
    p_descricao TEXT,
    p_dificuldade INT,
    p_recompensa TEXT,
    p_local_id INT,
    p_jogador_id INT);
```

---

## Procedimento para Ganhar Experiência em Missões

Este procedimento ganhar_experiencia_missao permite que um jogador ganhe experiência ao completar uma missão.

```sql
CREATE OR REPLACE PROCEDURE ganhar_experiencia_missao(jogador_id INT, missao_id INT)
LANGUAGE plpgsql
AS $$
DECLARE
    dificuldade_missao INT;
    local_id_missao INT;
    dificuldade_mapa INT;
    experiencia_ganha INT;
BEGIN
    SELECT dificuldade, local_id INTO dificuldade_missao, local_id_missao
    FROM Missoes
    WHERE id = missao_id;

    IF dificuldade_missao IS NULL THEN
        RAISE EXCEPTION 'Missão com ID % não encontrada.', missao_id;
    END IF;

    SELECT nivel_dificuldade INTO dificuldade_mapa
    FROM Mapa
    WHERE id = local_id_missao;

    IF dificuldade_mapa IS NULL THEN
        RAISE EXCEPTION 'Mapa com ID % não encontrado.', local_id_missao;
    END IF;

    experiencia_ganha := dificuldade_missao + dificuldade_mapa;

    UPDATE Jogadores
    SET experiencia = experiencia + experiencia_ganha
    WHERE id = jogador_id;

    RAISE NOTICE 'Jogador com ID % ganhou % de experiência ao completar a missão.', jogador_id, experiencia_ganha;
END;
$$;
```

## Chamada do Procedimento para Ganhar Experiência

Esta linha chama o procedimento ganhar_experiencia_missao, passando os IDs do jogador e da missão.

```sql
CALL ganhar_experiencia_missao(idJogador, idMissao);
```

## Remoção do Procedimento
Remove o procedimento ganhar_experiencia_missao, caso ele exista.

```sql
DROP PROCEDURE IF EXISTS ganhar_experiencia_missao(INT, INT);
```

## Procedimento para Atualizar Saúde do Jogador

Este procedimento `atualizar_saude_jogador` atualiza a saúde de um jogador específico.

```sql
CREATE OR REPLACE PROCEDURE atualizar_saude_jogador(
    p_jogador_id INT,
    p_nova_saude INT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Jogadores
    SET saude = p_nova_saude
    WHERE id = p_jogador_id;

    RAISE NOTICE 'A saúde do jogador % foi atualizada para %.', p_jogador_id, p_nova_saude;
END;
$$;
```

### Chamada do Procedimento para Atualizar Saúde do Jogador

Esta linha chama o procedimento `atualizar_saude_jogador`, passando o ID do jogador e a nova saúde.

```sql
CALL atualizar_saude_jogador(1, 80);
```

### Remoção do Procedimento

Remove o procedimento `atualizar_saude_jogador`, caso ele exista.

```sql
DROP PROCEDURE IF EXISTS atualizar_saude_jogador(
    p_jogador_id INT,
    p_nova_saude INT);
```

---
