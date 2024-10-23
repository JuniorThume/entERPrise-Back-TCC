import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCredentials1729084533180 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'credentials',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'username',
            type: 'varchar',
            length: '55',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
          }
        ]
      })
    );

    await queryRunner.query(
      `INSERT INTO credentials ("username", "password") VALUES ( 'admin' , '@adm1nP4ssW0rd')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('credentials');
  }
}
