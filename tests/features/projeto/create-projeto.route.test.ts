import { Endereco } from "./../../../src/app/models/endereco.model";
import { Avaliacao } from "./../../../src/app/models/avaliacao.model";
import { createServer } from "./../../../src/main/config/server.config";
import { DatabaseConnection, RedisConnection } from "../../../src/main/database";
import { Growdever } from "../../../src/app/models/growdever.model";

describe("Testes da feature projeto usando TDD", () => {
    beforeAll(async () => {
        await DatabaseConnection.connect();
        await RedisConnection.connect();
    });

    afterAll(async () => {
        await DatabaseConnection.destroy();
        await RedisConnection.destroy();
    });

    beforeEach(async () => {
        // Limpa os dados das tabelas abaixo
        await db.clear(Avaliacao);
        await db.clear(Endereco);
        await db.clear(Growdever);
    });

    const app = createServer();
    const db = DatabaseConnection.connection.manager;

    const createGrowdever = async (growdever?: Growdever) => {
        growdever = growdever ?? new Growdever("teste", 12345, 20, ["nodejs"]);

        const growdeverEntity = db.create(Growdever, {
            id: growdever.id,
            cpf: growdever.cpf,
            idade: growdever.idade,
            nome: growdever.nome,
            skills: growdever.skills,
        });

        await db.save(growdeverEntity);

        return growdever;
    };
});
