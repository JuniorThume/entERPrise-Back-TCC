import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePersonalData1730300041393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'personal_data',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'cpf',
            type: 'varchar',
            length: '11',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '20',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
            onUpdate: 'CASCADE'
          }
        ]
      })
    );

    await queryRunner.query(
      `INSERT INTO personal_data ("cpf", "name", "email") values ('00000000000', 'administrator', 'admin@teste.com');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('personal_data');
  }
}
