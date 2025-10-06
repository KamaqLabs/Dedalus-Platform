import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAdministratorProfileInvitation1759774942772 implements MigrationInterface {
    name = 'AddingAdministratorProfileInvitation1759774942772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`invitations\` (\`id\` varchar(36) NOT NULL, \`token_id\` varchar(255) NOT NULL, \`used\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expires_at\` datetime NOT NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_2ea681c65c57e9ec46f07d5aa9\` (\`token_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2ea681c65c57e9ec46f07d5aa9\` ON \`invitations\``);
        await queryRunner.query(`DROP TABLE \`invitations\``);
    }

}
