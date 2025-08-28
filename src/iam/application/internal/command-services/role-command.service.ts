import { IRoleCommandService } from '../../../domain/services/i-role-command-service';
import { ROLE_REPOSITORY_TOKEN } from '../../../domain/repositories/role-repository.token';
import { Inject, Injectable } from '@nestjs/common';
import type { IRoleRepository } from '../../../domain/repositories/i-role-repository';
import { Role } from '../../../domain/model/entities/role';
import { SeedRolesCommand } from '../../../domain/model/commands/seed-roles.command';
import { ERoles } from '../../../domain/model/value-objects/e-roles';

@Injectable()
export class RoleCommandService implements IRoleCommandService {
  constructor(
    @Inject(ROLE_REPOSITORY_TOKEN)
    private readonly roleRepository: IRoleRepository<Role>
  ) { }

  public async handleSeedRoles(command: SeedRolesCommand): Promise<void> {
      const roles = Object.values(ERoles);

    await Promise.all(
      roles.map(async roleName => {
        if (!await this.roleRepository.findRoleByName(roleName)) {
          await this.roleRepository.addAsync(Role.constructRole(roleName));
        }
      })
    );


  }

}