import { MigrationInterface, QueryRunner } from "typeorm";

export class TestColumnsUpdated1756954000499 implements MigrationInterface {
    name = 'TestColumnsUpdated1756954000499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`administrator_profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`account_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`dni\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`guest_profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`account_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`dni\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`status\` enum ('INACTIVE', 'ACTIVE') NOT NULL DEFAULT 'INACTIVE', \`nfc_key\` varchar(255) NULL, \`guestCode\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_44987cf53f2c3935784315315d\` (\`guestCode\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_44987cf53f2c3935784315315d\` ON \`guest_profile\``);
        await queryRunner.query(`DROP TABLE \`guest_profile\``);
        await queryRunner.query(`DROP TABLE \`administrator_profile\``);
    }

}
