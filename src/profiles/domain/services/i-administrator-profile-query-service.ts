import { GetAllAdministratorsByHotelIdQuery } from '../model/queries/get-all-administrators-by-hotel-id.query';
import { AdministratorProfile } from '../model/aggregates/Administrator-profile';
import {GetAdministratorProfileByIdQuery} from "../model/queries/get-administrator-profile-by-id.query";

export interface IAdministratorProfileQueryService {
    HandleGetAllAdministratorsByHotelId(query: GetAllAdministratorsByHotelIdQuery): Promise<AdministratorProfile[]>;
    HandleGetAdministratorProfileById(query: GetAdministratorProfileByIdQuery): Promise<AdministratorProfile>;
}

