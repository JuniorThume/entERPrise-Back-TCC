import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1718830788772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true
          },
          {
            name: 'nome',
            type: 'varchar'
          },
          {
            name: 'descricao',
            type: 'varchar'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
