import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLeadTable1632345678901 implements MigrationInterface {
  name = 'CreateLeadTable1632345678901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "lead" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "whatsapp" character varying NOT NULL,
        CONSTRAINT "PK_d567a49c7a95f163890e1e51763" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "lead"`);
  }
}
