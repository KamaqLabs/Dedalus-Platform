import { SeedRolesCommand } from '../model/commands/seed-roles.command';

export interface IRoleCommandService {
  handleSeedRoles(command: SeedRolesCommand): Promise<void>
}