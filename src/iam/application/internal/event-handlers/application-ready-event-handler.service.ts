import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RoleCommandService } from '../command-services/role-command.service';
import { SeedRolesCommand } from '../../../domain/model/commands/seed-roles.command';
import { AccountCommandService } from '../command-services/account-command.service';
import { SeedAdminAccountsCommand } from '../../../domain/model/commands/seed-admin-accounts.command';

@Injectable()
export class ApplicationReadyEventHandlerService implements OnApplicationBootstrap {
  constructor(
    private readonly roleCommandService: RoleCommandService,
    private readonly accountCommandService: AccountCommandService
  ) { }

  async onApplicationBootstrap(): Promise<void> {
    const seedRolesCommand = new SeedRolesCommand();
    console.log('Seeding roles');
    await this.roleCommandService.handleSeedRoles(seedRolesCommand);
    console.log('roles seeded')

    const seedAdminAccountsCommand = new SeedAdminAccountsCommand();
    console.log('Seeding admin accounts');
    await this.accountCommandService.handleSeedAdminAccounts(seedAdminAccountsCommand);
    console.log('Admin accounts seeded');
  }
}
