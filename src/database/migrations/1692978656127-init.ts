import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1692978656127 implements MigrationInterface {
    name = 'Init1692978656127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mimeType" character varying(100) NOT NULL, "size" double precision NOT NULL, "url" character varying NOT NULL, "path" character varying NOT NULL, "status" character varying(50) NOT NULL DEFAULT 'unused', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "PK_media_id" ON "media" ("id") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(60) NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying(60) NOT NULL, "photoMediaId" uuid, "status" character varying(50) NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_user_username" ON "user" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "PK_user_id" ON "user" ("id") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_b90e24f57637223a9500c368735" FOREIGN KEY ("photoMediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_b90e24f57637223a9500c368735"`);
        await queryRunner.query(`DROP INDEX "public"."PK_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_username"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."PK_media_id"`);
        await queryRunner.query(`DROP TABLE "media"`);
    }

}
