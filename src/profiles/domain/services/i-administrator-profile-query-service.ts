import { AdministratorProfile } from '../model/aggregates/Administrator-profile';
import {GetAdministratorProfileByIdQuery} from "../model/queries/get-administrator-profile-by-id.query";

export interface IAdministratorProfileQueryService {
    HandleGetAdministratorProfileById(query: GetAdministratorProfileByIdQuery): Promise<AdministratorProfile>;
    HandleGetAdministratorProfileByAccountId(accountId: number): Promise<AdministratorProfile>;
}

