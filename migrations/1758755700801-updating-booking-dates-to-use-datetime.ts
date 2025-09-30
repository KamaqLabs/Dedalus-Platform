import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingBookingDatesToUseDatetime1758755700801 implements MigrationInterface {
    name = 'UpdatingBookingDatesToUseDatetime1758755700801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`check_in_date\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`check_in_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`check_out_date\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`check_out_date\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`check_out_date\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`check_out_date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`check_in_date\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`check_in_date\` date NOT NULL`);
    }

}
