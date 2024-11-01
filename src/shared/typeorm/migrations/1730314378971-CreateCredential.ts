import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';
import bcrypt from 'bcrypt';

export class CreateCredential1730314378971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'credentials',
        columns: [
          {
            name: 'employee_id',
            type: 'integer',
            isPrimary: true
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

    await queryRunner.createForeignKey(
      'credentials',
      new TableForeignKey({
        referencedTableName: 'employees',
        referencedColumnNames: ['id'],
        columnNames: ['employee_id']
      })
    );

    await queryRunner.query(
      `INSERT INTO employees ("personal_data", "role", "name" ) values ('1', 'admin', 'administrator')`
    );

    const hash_password = await bcrypt.hash('@adm1nP4ssW0rd', 10);
    await queryRunner.query(
      `INSERT INTO credentials ("username", "password", "employee_id") VALUES ( 'admin' , '${hash_password}', '1')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('credentials');
  }
}
