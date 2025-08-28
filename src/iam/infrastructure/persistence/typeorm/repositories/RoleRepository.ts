import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository';
import { Role } from '../../../../domain/model/entities/role';
import { IRoleRepository } from '../../../../domain/repositories/i-role-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ERoles } from '../../../../domain/model/value-objects/e-roles';

@Injectable()
export class RoleRepository extends BaseRepository<Role>
  implements IRoleRepository<Role>{

  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {
    super(roleRepository);
  }


  findRoleByName(name: ERoles): Promise<Role> {
    return this.roleRepository.findOneBy({ name });
  }

}