import { SignUpCommand } from '../model/commands/sign-up.command';
import { Account } from '../model/aggregates/account';
import { RefreshTokenCommand } from '../model/commands/refresh-token.command';
import { DeleteAccountCommand } from '../model/commands/delete-account.command';
import { ChangePasswordCommand } from '../model/commands/change-password.command';
import { CreateTokenForInvitationCommand } from '../model/commands/create-token-for-invitation.command';
import { ValidateInvitationTokenCommand } from '../model/commands/validate-invitation-token.command';
import { SeedAdminAccountsCommand } from '../model/commands/seed-admin-accounts.command';
import { UpdateAccountRoleCommand } from '../model/commands/update-account-role.command';
import { RememberIdentityInformationCommand } from '../model/commands/remember-identity-information.command';
import { LogoutCommand } from '../model/commands/logout.command';

export interface IAccountCommandService {
  handleSignUp(command: SignUpCommand): Promise<Account>
  handleSignIn(command: SignUpCommand): Promise<{ token: string, refreshToken: string }>
  handleLogout(command: LogoutCommand): Promise<void>
  handleRefreshToken(command: RefreshTokenCommand): Promise<{ token: string, refreshToken: string }>
  handleDeleteAccount(command: DeleteAccountCommand): Promise<void>
  handleChangePassword(command: ChangePasswordCommand): Promise<void>
  /*handleCreateTokenForInvitation(command: CreateTokenForInvitationCommand): Promise<string>
  handleValidateInvitationToken(command: ValidateInvitationTokenCommand): Promise<{ athleteType: string, availableSessions: number }>*/
  handleSeedAdminAccounts(command: SeedAdminAccountsCommand): Promise<void>
  handleUpdateAccountRole(command: UpdateAccountRoleCommand): Promise<void>
  handleRememberIdentity(command: RememberIdentityInformationCommand): Promise<{ id: number, username: string, rol: string }>
}