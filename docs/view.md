# Views

## Criação da View

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

## Remoção da View

Este comando remove a view monstros_mortos, caso ela exista.

```sql
DROP VIEW IF EXISTS monstros_mortos;
```

# QUERIES

## Consulta para Visualizar os Monstros Mortos

Aqui está novamente a consulta para visualizar os dados da view monstros_mortos.

```sql
SELECT * FROM monstros_mortos;
```

# PROCEDURES

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