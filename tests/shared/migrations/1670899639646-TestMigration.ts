import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1670899639646 implements MigrationInterface {
    name = 'TestMigration1670899639646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "endereco" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rua" varchar NOT NULL, "cidade" varchar NOT NULL, "uf" varchar NOT NULL, "complemento" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "growdever" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "cpf" integer NOT NULL, "idade" integer NOT NULL, "skills" varchar, "id_endereco" integer NOT NULL, CONSTRAINT "REL_a65e6314134b1eefafdad82229" UNIQUE ("id_endereco"))`);
        await queryRunner.query(`CREATE TABLE "avaliacao" ("id" varchar PRIMARY KEY NOT NULL, "modulo" varchar NOT NULL, "nota" integer NOT NULL, "mentor" varchar, "id_growdever" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_growdever" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "cpf" integer NOT NULL, "idade" integer NOT NULL, "skills" varchar, "id_endereco" integer NOT NULL, CONSTRAINT "REL_a65e6314134b1eefafdad82229" UNIQUE ("id_endereco"), CONSTRAINT "FK_a65e6314134b1eefafdad82229e" FOREIGN KEY ("id_endereco") REFERENCES "endereco" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_growdever"("id", "nome", "cpf", "idade", "skills", "id_endereco") SELECT "id", "nome", "cpf", "idade", "skills", "id_endereco" FROM "growdever"`);
        await queryRunner.query(`DROP TABLE "growdever"`);
        await queryRunner.query(`ALTER TABLE "temporary_growdever" RENAME TO "growdever"`);
        await queryRunner.query(`CREATE TABLE "temporary_avaliacao" ("id" varchar PRIMARY KEY NOT NULL, "modulo" varchar NOT NULL, "nota" integer NOT NULL, "mentor" varchar, "id_growdever" varchar NOT NULL, CONSTRAINT "FK_25b840d42859e330f25fcbbc4b6" FOREIGN KEY ("id_growdever") REFERENCES "growdever" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_avaliacao"("id", "modulo", "nota", "mentor", "id_growdever") SELECT "id", "modulo", "nota", "mentor", "id_growdever" FROM "avaliacao"`);
        await queryRunner.query(`DROP TABLE "avaliacao"`);
        await queryRunner.query(`ALTER TABLE "temporary_avaliacao" RENAME TO "avaliacao"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avaliacao" RENAME TO "temporary_avaliacao"`);
        await queryRunner.query(`CREATE TABLE "avaliacao" ("id" varchar PRIMARY KEY NOT NULL, "modulo" varchar NOT NULL, "nota" integer NOT NULL, "mentor" varchar, "id_growdever" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "avaliacao"("id", "modulo", "nota", "mentor", "id_growdever") SELECT "id", "modulo", "nota", "mentor", "id_growdever" FROM "temporary_avaliacao"`);
        await queryRunner.query(`DROP TABLE "temporary_avaliacao"`);
        await queryRunner.query(`ALTER TABLE "growdever" RENAME TO "temporary_growdever"`);
        await queryRunner.query(`CREATE TABLE "growdever" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "cpf" integer NOT NULL, "idade" integer NOT NULL, "skills" varchar, "id_endereco" integer NOT NULL, CONSTRAINT "REL_a65e6314134b1eefafdad82229" UNIQUE ("id_endereco"))`);
        await queryRunner.query(`INSERT INTO "growdever"("id", "nome", "cpf", "idade", "skills", "id_endereco") SELECT "id", "nome", "cpf", "idade", "skills", "id_endereco" FROM "temporary_growdever"`);
        await queryRunner.query(`DROP TABLE "temporary_growdever"`);
        await queryRunner.query(`DROP TABLE "avaliacao"`);
        await queryRunner.query(`DROP TABLE "growdever"`);
        await queryRunner.query(`DROP TABLE "endereco"`);
    }

}
