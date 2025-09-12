import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingRoomClassEntity1757628253278 implements MigrationInterface {
    name = 'AddingRoomClassEntity1757628253278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room_class\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hotel_id\` int NOT NULL, \`room_class_name\` varchar(255) NOT NULL, \`max_occupancy\` int NOT NULL, \`default_price_per_night\` decimal(10,2) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`room_class\``);
    }

}
