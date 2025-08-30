import { MigrationInterface, QueryRunner } from "typeorm";

export class TestColumnsUpdated1756491049418 implements MigrationInterface {
    name = 'TestColumnsUpdated1756491049418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`hashed_password\` text NOT NULL, \`salt\` text NULL, \`token\` text NULL, \`rol_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_310808447b63c7711b9c0f2d1ed\` FOREIGN KEY (\`rol_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_310808447b63c7711b9c0f2d1ed\``);
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
