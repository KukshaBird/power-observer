import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772747552061 implements MigrationInterface {
    name = 'Init1772747552061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."power_status_status_enum" AS ENUM('connected', 'disconnected')`);
        await queryRunner.query(`CREATE TABLE "power_status" ("id" SERIAL NOT NULL, "status" "public"."power_status_status_enum" NOT NULL DEFAULT 'disconnected', "time" character varying(50) NOT NULL, "trustable" boolean NOT NULL DEFAULT true, "created_at" date NOT NULL DEFAULT now(), CONSTRAINT "PK_8c8217332c4afea7a98e07e5bdc" PRIMARY KEY ("id")); COMMENT ON COLUMN "power_status"."time" IS '2026-03-03T22:15:00.028900028+02:00'`);
        await queryRunner.query(`CREATE INDEX "IDX_caf8bc9fc285e9b8c07fae76fe" ON "power_status" ("time") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_caf8bc9fc285e9b8c07fae76fe"`);
        await queryRunner.query(`DROP TABLE "power_status"`);
        await queryRunner.query(`DROP TYPE "public"."power_status_status_enum"`);
    }

}
