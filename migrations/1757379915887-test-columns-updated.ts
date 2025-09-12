import { MigrationInterface, QueryRunner } from "typeorm";

export class TestColumnsUpdated1757379915887 implements MigrationInterface {
    name = 'TestColumnsUpdated1757379915887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hotel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hotel_name\` varchar(255) NOT NULL, \`hotel_ruc\` varchar(255) NOT NULL, \`hotel_address\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`hotel\``);
    }

}
