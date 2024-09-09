| Versão |    Data    | Descrição               | Autor                                                                                                                 |
| :----: | :--------: | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `1.0`  | 09/09/2024 | Criação do documento de Triggers | [Silas Neres](https://github.com/Silas-neres)|

# Triggers

## Trigger para Atualizar o Nível do Jogador Quando a Experiência Atingir um Limite

Esse trigger será ativado sempre que um jogador ganhar experiência. Ele verificará se a experiência acumulada atingiu o limite necessário para subir de nível e, se sim, atualizará o nível do jogador e ajustará seus atributos (saúde, dano, etc.).

```sql
CREATE OR REPLACE FUNCTION atualizar_nivel_jogador() 
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica se o jogador atingiu a experiência necessária para subir de nível
    IF NEW.experiencia >= (SELECT exp_para_subir FROM Niveis WHERE nivel = NEW.nivel_id) THEN
        -- Incrementa o nível
        NEW.nivel_id := NEW.nivel_id + 1;

        -- Atualiza os atributos do jogador com base no novo nível
        NEW.saude := NEW.saude + (SELECT aumento_saude FROM Niveis WHERE nivel = NEW.nivel_id);
        NEW.dano := NEW.dano + (SELECT aumento_dano FROM Niveis WHERE nivel = NEW.nivel_id);
        
        -- Mensagem de sucesso
        RAISE NOTICE 'Parabéns! O jogador % subiu para o nível %.', NEW.nome, NEW.nivel_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizar_nivel
AFTER UPDATE OF experiencia ON Jogadores
FOR EACH ROW
WHEN (OLD.experiencia < NEW.experiencia)
EXECUTE FUNCTION atualizar_nivel_jogador();

```

## Trigger para Reviver Monstro Automaticamente Após um Período de Tempo

Este trigger pode ser útil para reviver monstros após um certo período, garantindo que eles reapareçam no jogo. Vamos assumir que o monstro deve ser revivido após 24 horas.

```sql

CREATE OR REPLACE FUNCTION reviver_monstro() 
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica se o monstro está morto
    IF OLD.vida <= 0 THEN
        -- Revive o monstro após 24 horas
        PERFORM pg_sleep(86400);  -- Pausa de 24 horas (86.400 segundos)
        
        -- Restaura a vida original do monstro
        UPDATE Monstros 
        SET vida = (SELECT vida_original FROM Monstros WHERE id = NEW.id)
        WHERE id = OLD.id;
        
        RAISE NOTICE 'O monstro % foi revivido.', OLD.nome;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_reviver_monstro
AFTER UPDATE OF vida ON Monstros
FOR EACH ROW
WHEN (OLD.vida > 0 AND NEW.vida <= 0)
EXECUTE FUNCTION reviver_monstro();

```

## Trigger para Log de Combate

Esse trigger será ativado toda vez que houver uma interação de combate entre o jogador e um monstro, gravando os detalhes do combate (por exemplo, o dano causado e a vida restante de ambos).

```sql

CREATE OR REPLACE FUNCTION log_combate() 
RETURNS TRIGGER AS $$
BEGIN
    -- Insere um log com as informações do combate
    INSERT INTO LogCombate (jogador_id, monstro_id, dano_jogador, dano_monstro, data_combate)
    VALUES (NEW.jogador_id, NEW.monstro_id, NEW.dano_jogador, NEW.dano_monstro, NOW());
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_combate
AFTER INSERT ON Combate
FOR EACH ROW
EXECUTE FUNCTION log_combate();


```

## Trigger para Remover Itens do Inventário Quando Usados

Este trigger será ativado toda vez que um item for utilizado por um jogador. Ele removerá o item do inventário do jogador ou diminuirá a quantidade se houver mais de uma unidade do item.

```sql
CREATE OR REPLACE FUNCTION remover_item_inventario() 
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica se a quantidade de itens no inventário é maior que 1
    IF OLD.quantidade > 1 THEN
        -- Diminui a quantidade
        UPDATE Itens
        SET quantidade = quantidade - 1
        WHERE id = OLD.id AND jogador_id = OLD.jogador_id;
    ELSE
        -- Remove o item do inventário
        DELETE FROM Itens
        WHERE id = OLD.id AND jogador_id = OLD.jogador_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_remover_item
AFTER UPDATE OF quantidade ON Itens
FOR EACH ROW
WHEN (NEW.quantidade = 0)
EXECUTE FUNCTION remover_item_inventario();

```

## Trigger para Atualizar o Inventário Após Coletar um Item

Esse trigger será ativado quando um jogador encontrar um item e adicioná-lo ao seu inventário.

```sql
CREATE OR REPLACE FUNCTION atualizar_inventario_jogador() 
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica se o item já existe no inventário do jogador
    IF EXISTS(SELECT 1 FROM Itens WHERE jogador_id = NEW.jogador_id AND nome = NEW.nome) THEN
        -- Se o item já existe, incrementa a quantidade
        UPDATE Itens 
        SET quantidade = quantidade + 1
        WHERE jogador_id = NEW.jogador_id AND nome = NEW.nome;
    ELSE
        -- Caso contrário, adiciona o item ao inventário
        INSERT INTO Itens (jogador_id, nome, descricao, quantidade)
        VALUES (NEW.jogador_id, NEW.nome, NEW.descricao, 1);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizar_inventario
AFTER INSERT ON Itens
FOR EACH ROW
EXECUTE FUNCTION atualizar_inventario_jogador();


```
