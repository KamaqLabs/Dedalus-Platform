import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingAdministratorProfile1758944067460 implements MigrationInterface {
    name = 'UpdatingAdministratorProfile1758944067460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`administrator_profile\` ADD \`hotel_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`administrator_profile\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`administrator_profile\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`administrator_profile\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`administrator_profile\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`administrator_profile\` DROP COLUMN \`hotel_id\``);
    }

}
