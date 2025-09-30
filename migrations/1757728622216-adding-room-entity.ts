import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingRoomEntity1757728622216 implements MigrationInterface {
    name = 'AddingRoomEntity1757728622216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hotel_id\` int NOT NULL, \`room_number\` varchar(10) NOT NULL, \`floor\` int NOT NULL, \`nfc_key\` varchar(100) NULL, \`modules_id\` json NOT NULL, \`room_status\` enum ('available', 'occupied', 'reserved', 'maintenance') NOT NULL DEFAULT 'available', \`room_class_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`room\``);
    }

}
