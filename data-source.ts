import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import {Hotel} from "./src/hotel/domain/model/aggregates/Hotel";
import {Account} from "./src/iam/domain/model/aggregates/account";
import {Role} from "./src/iam/domain/model/entities/role";
import {AdministratorProfile} from "./src/profiles/domain/model/aggregates/Administrator-profile";
import {GuestProfile} from "./src/profiles/domain/model/aggregates/Guest-Profile";
import {RoomClass} from "./src/hotel/domain/model/entites/RoomClass";
import {Room} from "./src/hotel/domain/model/aggregates/Room";
import {Booking} from "./src/booking/domain/model/aggregates/Booking";
import {Invitation} from "./src/profiles/domain/model/aggregates/invitation";
dotenv.config();

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    //entities: [Account, Role, AdministratorProfile, GuestProfile, Hotel, RoomClass,Room, Booking, Invitation],
    migrations: [  __dirname + '/migrations/*.ts'],
    synchronize: false, // MUST BE FALSE for migrations! te estoy viendo Sihuar ojo.
});