import { IBaseRepository } from '../../../shared/domain/repositories/i-base-repository';
import { Role } from '../model/entities/role';

export interface IRoleRepository<Role> extends IBaseRepository<Role> {
  findRoleByName(name: string): Promise<Role>;
}