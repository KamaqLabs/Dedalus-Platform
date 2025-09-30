import { IBaseRepository } from '../../../shared/domain/repositories/i-base-repository';
import {AdministratorProfile} from "../model/aggregates/Administrator-profile";

export interface IAdministratorProfileRepository<AdministratorProfile> extends IBaseRepository<AdministratorProfile> {
    findProfileByAccountIdAsync(accountId: number): Promise<AdministratorProfile | null>;
    findAdministratorProfileByEmailAsync(email: string): Promise<AdministratorProfile | null>
    findAdministratorByDniAsync(dni: string): Promise<AdministratorProfile | null>
    findAdministratorByAccountId(accountId: number): Promise<AdministratorProfile | null>
}

