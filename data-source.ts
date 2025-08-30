import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    //entities: [Account, Role], // Add ALL your entities here
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false, // MUST BE FALSE for migrations! te estoy viendo Sihuar ojo.
});