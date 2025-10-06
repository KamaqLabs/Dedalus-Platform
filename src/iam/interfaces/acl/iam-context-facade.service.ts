import { Inject, Injectable } from '@nestjs/common';
import { AccountCommandService } from '../../application/internal/command-services/account-command.service';
import { SignUpCommand } from '../../domain/model/commands/sign-up.command';
import { DeleteAccountCommand } from '../../domain/model/commands/delete-account.command';
import { GetAccountByIdQuery } from '../../domain/model/queries/get-account-by-id.query';
import { AccountQueryService } from '../../application/internal/query-services/account-query.service';
import { CreateTokenForInvitationCommand } from '../../domain/model/commands/create-token-for-invitation.command';
import { ValidateInvitationTokenCommand } from '../../domain/model/commands/validate-invitation-token.command';
import { UpdateAccountRoleCommand } from '../../domain/model/commands/update-account-role.command';

@Injectable()
export class IamContextFacadeService {
  constructor(
    @Inject()
    private readonly accountCommandService: AccountCommandService,
    @Inject()
    private readonly accountQueryService: AccountQueryService
  ) { }

  public async createAccount(username: string, password: string, rol: string) : Promise<number> {
    const signUpCommand = new SignUpCommand( {username, password, rol });
    const account = await this.accountCommandService.handleSignUp(signUpCommand);
    return account.id;
  }

  public async deleteAccount(accountId: number) {
    const deleteAccountCommand = new DeleteAccountCommand({ accountId });
    await this.accountCommandService.handleDeleteAccount(deleteAccountCommand);
  }

  public async obtainUsernameByAccountId(accountId: number): Promise<string> {
    const getAccountByIdQuery = new GetAccountByIdQuery(accountId);
    const account = await this.accountQueryService.handleGetAccountById(getAccountByIdQuery);
    return account ? account.username : 'Cuenta no encontrada';
  }

    public async obtainInvitationUrl(email:string, jti: string): Promise<string> {
        const createTokenForInvitationCommand = new CreateTokenForInvitationCommand(email, jti);
        return await this.accountCommandService.handleCreateTokenForInvitation(createTokenForInvitationCommand);
    }

    public async obtainInvitationTokenPayload(token: string): Promise<{ email: string, jti: string}> {
        const validateInvitationTokenCommand = new ValidateInvitationTokenCommand(token);
        return await this.accountCommandService.handleValidateInvitationToken(validateInvitationTokenCommand);
    }


  public async updateAccountRole(accountId: number, role: string): Promise<void> {
    const command = new UpdateAccountRoleCommand(accountId, role);
    return await this.accountCommandService.handleUpdateAccountRole(command);
  }


}
