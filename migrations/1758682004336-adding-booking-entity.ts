import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingBookingEntity1758682004336 implements MigrationInterface {
    name = 'AddingBookingEntity1758682004336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`booking\` (\`id\` int NOT NULL AUTO_INCREMENT, \`guest_id\` int NOT NULL, \`hotel_id\` int NOT NULL, \`room_id\` int NOT NULL, \`check_in_date\` date NOT NULL, \`check_out_date\` date NOT NULL, \`status\` enum ('PENDING', 'CONFIRMED', 'CHECKED_IN', 'CANCELLED', 'CHECKED_OUT') NOT NULL DEFAULT 'PENDING', \`total_price\` decimal(10,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`booking\``);
    }

}
