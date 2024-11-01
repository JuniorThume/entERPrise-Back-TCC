import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateProducts1718830788772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'name',
            type: 'varchar',
            length: '150'
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true
          },
          {
            name: 'category',
            type: 'varchar'
          },
          {
            name: 'material',
            type: 'varchar'
          },
          {
            name: 'genre',
            type: 'varchar'
          },
          {
            name: 'brand',
            type: 'varchar'
          },
          {
            name: 'image',
            type: 'bytea',
            isNullable: true
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

    await queryRunner.createTable(
      new Table({
        name: 'product_options',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'size',
            type: 'varchar'
          },
          {
            name: 'quantity',
            type: 'int'
          },
          {
            name: 'color',
            type: 'varchar'
          },
          {
            name: 'price',
            type: 'decimal'
          },
          {
            name: 'product_id',
            type: 'int',
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
      'product_options',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'options_id');
    await queryRunner.dropTable('product_options');
    await queryRunner.dropTable('products');
  }
}
