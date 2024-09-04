import pg from "pg";
import { readFileSync } from "fs";

const { Client } = pg;
var sqlTables = readFileSync("../docs/Entrega_02/DDL.sql").toString();
var sqlData = readFileSync("../docs/Entrega_02/DML.sql").toString();

function separador() {
  console.log("==========================================================================")
}

class WarframeApi {
  client = new Client({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    port: 5451,
    database: "warframe",
  });

  constructor() {
    this.client.connect();
  }

  createTables = async () => {
    let response = false;
    console.log(sqlTables);
    await this.client.query(sqlTables).then((results) => {
      response = true;
    });
    return response;
  };

  populateTables = async () => {
    let response = false;
    await this.client.query(sqlData).then((results) => {
      response = true;
    });
    return response;
  };

  // Função para exibir os inimigos de uma missão
  mostrarInimigosDaMissao = async (idMissao) => {
    try {
      const inimigos = await this.client.query(`
            SELECT nomeInimigo, tipoInimigo, nivel 
            FROM Inimigo 
            WHERE Missao = $1
        `, [idMissao]);

      if (inimigos.rows.length === 0) {
        console.log("Nenhum inimigo encontrado nesta missão.");
      } else {
        console.log("\nInimigos encontrados na missão:");
        inimigos.rows.forEach(inimigo => {
          console.log(`- ${inimigo.nomeinimigo} (Tipo: ${inimigo.tipoinimigo}, Nível: ${inimigo.nivel})`);
        });
      }
    } catch (error) {
      console.error("Erro ao listar os inimigos da missão:", error.message || error);
    }
  }

  // Função para exibir os recursos de uma missão
  mostrarRecursosDaMissao = async (idMissao) => {
    try {
      const recursos = await this.client.query(`
        SELECT 
        r.nomeRecurso, COUNT(*) AS quantidade
        FROM Recurso r
        JOIN MissaoRecurso mr ON r.idRecurso = mr.idRecurso
        WHERE mr.idMissao = $1
        GROUP BY r.nomeRecurso
        ORDER BY quantidade DESC;
        `, [idMissao]);

      if (recursos.rows.length === 0) {
        console.log("Nenhum recurso encontrado nesta missão.");
      } else {
        console.log("\nRecursos encontrados na missão:");
        recursos.rows.forEach(recurso => {
          console.log(`${recurso.nomerecurso}: ${recurso.quantidade}`);
        });
      }
    } catch (error) {
      console.error("Erro ao listar os recursos da missão:", error.message || error);
    }
  }

  mostrarInventario = async () => {
    try {
      const inventario = await this.client.query(`
        SELECT COUNT(i.idInstanciaItem) AS totalitens, r.nomeRecurso  
        FROM InstanciaItem i
        JOIN Inventario ii ON i.idInventario = ii.idInventario
        LEFT JOIN Recurso r ON i.idRecurso = r.idRecurso
        GROUP BY r.nomeRecurso
        ORDER BY totalitens DESC;`);
      if (inventario.rows.length === 0) {
        console.log("Seu inventário está vazio");
      } else {
        console.log("Seus itens:");
        inventario.rows.forEach(i => {
          console.log(`|${i.nomerecurso} | Quantidade: ${i.totalitens}`);
        });
      }
    } catch (error) {
      console.error("Erro ao mostrar inventário:", error.message || error);
    }
  }

  // Função para adicionar recursos ao inventário
  adicionarRecursoAoInventario = async (idInstanciaItem, idInventario, idRecurso) => {
    try {
      const result = await this.client.query(`
        UPDATE InstanciaItem
        SET idInventario = ${idInventario}
        WHERE idInstanciaItem = ${idInstanciaItem} AND idRecurso = ${idRecurso}
        RETURNING *;
      `);
      if (result.rows.length === 0) {
        console.log("Erro ao adicionar recurso ao inventário.");
      } else {
        return result.rows[0]; // Retorna o recurso atualizado, se necessário
      }
    } catch (error) {
      console.error("Erro ao adicionar o recurso ao inventário:", error.message || error);
    }
  }

  // Função para atualizar a capacidade do inventário
  atualizarCapacidadeInventario = async (idInventario) => {
    try {
      const result = await this.client.query(`
        UPDATE Inventario
        SET capacidade = capacidade - 1
        WHERE idInventario = ${idInventario}
        RETURNING capacidade;
      `);
      if (result.rows.length === 0) {
        console.log("Erro ao atualizar a capacidade do inventário.");
      } else {
        console.log("Capacidade do inventário atualizada para:", result.rows[0].capacidade);
      }
    } catch (error) {
      console.error("Erro ao atualizar a capacidade do inventário:", error.message || error);
    }
  }

  // Função para contar instâncias e atualizar a capacidade do inventário
  contarEAtualizarCapacidade = async (idInventario) => {
    try {
      const countResult = await this.client.query(`
        SELECT COUNT(*) AS item_count
        FROM InstanciaItem
        WHERE idInventario = ${idInventario};
      `);

      const itemCount = parseInt(countResult.rows[0].item_count, 10);

      if (itemCount > 0) {
        const updateResult = await this.client.query(`
          UPDATE Inventario
          SET capacidade = capacidade - ${itemCount}
          WHERE idInventario = ${idInventario}
          RETURNING capacidade;
        `);

        console.log(`A capacidade do inventário foi atualizada para: ${updateResult.rows[0].capacidade}`);
      } else {
        console.log("Nenhuma instância foi encontrada no inventário.");
      }
    } catch (error) {
      console.error("Erro ao contar instâncias ou atualizar a capacidade do inventário:", error.message || error);
    }
  }

  // Função para simular o ataque a um inimigo
  atacarInimigo = async (idInimigo, idArma) => {
    try {
      const inimigoResult = await this.client.query(`
        SELECT vidaAtual, vidaMax
        FROM Inimigo
        WHERE idInimigo = ${idInimigo};
      `);

      if (inimigoResult.rows.length === 0) {
        console.log("Inimigo não encontrado.");
        return;
      }

      let vidaAtual = inimigoResult.rows[0].vidaAtual;

      const armaResult = await this.client.query(`
        SELECT dano, municaoAtual, municaoMax
        FROM Arma
        WHERE idArma = ${idArma};
      `);

      if (armaResult.rows.length === 0) {
        console.log("Arma não encontrada.");
        return;
      }

      let dano = armaResult.rows[0].dano;
      let municaoAtual = armaResult.rows[0].municaoAtual;

      if (municaoAtual <= 0) {
        console.log("Sem munição suficiente para atacar.");
        return;
      }

      vidaAtual -= dano;

      if (vidaAtual <= 0) {
        await this.client.query(`
          DELETE FROM Inimigo
          WHERE idInimigo = ${idInimigo};
        `);
        console.log("Inimigo eliminado.");
      } else {
        await this.client.query(`
          UPDATE Inimigo
          SET vidaAtual = ${vidaAtual}
          WHERE idInimigo = ${idInimigo};
        `);
        console.log(`Vida do inimigo atualizada para: ${vidaAtual}`);
      }

      municaoAtual -= 1;
      await this.client.query(`
        UPDATE Arma
        SET municaoAtual = ${municaoAtual}
        WHERE idArma = ${idArma};
      `);
      console.log(`Munição da arma atualizada para: ${municaoAtual}`);

    } catch (error) {
      console.error("Erro ao atacar inimigo:", error.message || error);
    }
  }

}

export default WarframeApi;
