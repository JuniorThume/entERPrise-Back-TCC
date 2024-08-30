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
            length: '255'
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
            name: 'gender',
            type: 'varchar'
          },
          {
            name: 'brand',
            type: 'varchar'
          },
          {
            name: 'image_url',
            type: 'varchar',
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'product_infos',
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
            name: 'prize',
            type: 'decimal'
          },
          {
            name: 'product_id',
            type: 'int'
          }
        ]
      })
    );
    await queryRunner.createForeignKey(
      'product_infos',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'infos_id');
    await queryRunner.dropTable('product_infos');
    await queryRunner.dropTable('products');
  }
}
