import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostsTable1620285242651 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'post',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'summary',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'skills',
            type: 'varchar',
          },
          {
            name: 'project_link',
            type: 'varchar',
          },
          {
            name: 'repo_link',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('post');
  }
}
