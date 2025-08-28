import { Inject, Injectable } from '@nestjs/common';
import { IAccountCommandService } from '../../../domain/services/i-account-command-service';
import { SignUpCommand } from 'src/iam/domain/model/commands/sign-up.command';
import { ACCOUNT_REPOSITORY_TOKEN } from '../../../domain/repositories/account-repository.token';
import type { IAccountRepository } from '../../../domain/repositories/i-account-repository';
import { Account } from '../../../domain/model/aggregates/account';
import { CryptoService } from '../../../infrastructure/hashing/crypto/crypto.service';
import { AuthJwtService } from '../../../infrastructure/auth/jwt/auth-jwt.service';
import { SignInCommand } from '../../../domain/model/commands/sign-in.command';
import { ROLE_REPOSITORY_TOKEN } from '../../../domain/repositories/role-repository.token';
import type { IRoleRepository } from '../../../domain/repositories/i-role-repository';
import { Role } from '../../../domain/model/entities/role';
import { ERoles } from '../../../domain/model/value-objects/e-roles';
import { UsernameExistsError } from '../../errors/username-exists.error';
import { RoleNotFoundError } from '../../errors/role-not-found.error';
import { AccountNotFoundError } from '../../errors/account-not-found.error';
import { InvalidPasswordError } from '../../errors/invalid-password.error';
import { RefreshTokenCommand } from '../../../domain/model/commands/refresh-token.command';
import { DifferentTokenError } from '../../errors/different-token.error';
import { InvalidTokenError } from '../../errors/invalid-token.error';
import { DeleteAccountCommand } from '../../../domain/model/commands/delete-account.command';
import { ChangePasswordCommand } from '../../../domain/model/commands/change-password.command';
import { CreateTokenForInvitationCommand } from '../../../domain/model/commands/create-token-for-invitation.command';
import { ValidateInvitationTokenCommand } from '../../../domain/model/commands/validate-invitation-token.command';
import { SeedAdminAccountsCommand } from '../../../domain/model/commands/seed-admin-accounts.command';
import { ConfigService } from '@nestjs/config';
import { UpdateAccountRoleCommand } from '../../../domain/model/commands/update-account-role.command';
import { CantChangeAdminRoleError } from '../../errors/cant-change-admin-role.error';
import {
  RememberIdentityInformationCommand
} from '../../../domain/model/commands/remember-identity-information.command';
import * as process from 'node:process';
import { TokenError } from '../../errors/token.error';
import { LogoutCommand } from '../../../domain/model/commands/logout.command';

@Injectable()
export class AccountCommandService implements IAccountCommandService {
    constructor(
      @Inject(ACCOUNT_REPOSITORY_TOKEN)
      private readonly accountRepository: IAccountRepository<Account>,
      @Inject(ROLE_REPOSITORY_TOKEN)
      private readonly roleRepository: IRoleRepository<Role>,
      @Inject() private readonly cryptoService: CryptoService,
      @Inject() private readonly jwtService: AuthJwtService,
      private readonly configService: ConfigService

    ) { }

  async handleSignUp(command: SignUpCommand): Promise<Account> {

    if (await this.accountRepository
      .findAccountByUsername(command.username)) {
      throw new UsernameExistsError();
    }

    const role = await this.roleRepository.findRoleByName(command.rol);
    if (!role) throw new RoleNotFoundError();


    const hashedPassword = await this.cryptoService.hashPassword(command.password);
    const account = Account.constructAccountFromCommand(command);
    account.setRole(role);

    // const token =
    //   await this.jwtService.generateToken(
    //     //TODO: Improve this, is it ok use "{}"?
    //     {
    //       id: account.id,
    //       username: account.username,
    //       rol: ERoles[account.rol.name]
    //     }
    //   )
    // const encryptedToken = this.cryptoService.encryptToken(token.refreshToken);
    //
    // account.setEncryptedRefreshToken(encryptedToken);
    account.setHashedPasswordAndSalt(hashedPassword);

    const persistedAccount = await this.accountRepository.addAsync(account);
    console.log(account.rol.name);
      return (await this.accountRepository.findByIdAsync(persistedAccount.id))!;
    }

    public async handleSignIn(command: SignInCommand): Promise<{ token: string, refreshToken: string, profileId: number, username: string, rol: string }> {
      const account = await this.accountRepository.findAccountByUsername(command.username);
      if (!account) throw new AccountNotFoundError()

      if(!await this.cryptoService
        .verifyHashedPassword(command.password, account.salt, account.hashedPassword)){
          throw new InvalidPasswordError();
        }
      const token = await this.jwtService.generateToken(
        {
          id: account.id,
          username: account.username,
          rol: ERoles[account.rol.name]
        })

      console.log(ERoles[account.rol.name]);
      const encryptedToken = this.cryptoService.encryptToken(token.refreshToken);
      account.setEncryptedRefreshToken(encryptedToken);

      await this.accountRepository.addAsync(account);
      return {
        token: token.accessToken,
        refreshToken: encryptedToken,
        profileId: account.id,
        username: account.username,
        rol: ERoles[account.rol.name]
      };
    }


    async handleLogout(command: LogoutCommand): Promise<void> {
        const account = await this.accountRepository.findByIdAsync(command.accountId);
        if (!account) throw new AccountNotFoundError();

        account.deleteEncryptedRefreshToken();

        await this.accountRepository.updateAsync(account);
    }

  public async handleRefreshToken(command: RefreshTokenCommand): Promise<{ token: string; refreshToken: string }> {
      const decryptedTokenFromCommand =  this.cryptoService.decryptToken(command.refreshToken);
      const payload = await this.jwtService.verifyAuthorizationToken(decryptedTokenFromCommand);
      if(payload.ok === false) throw new InvalidTokenError();

      const account = await this.accountRepository.findByIdAsync(payload.value.id);
      if(!account) throw new AccountNotFoundError();

      const decryptedTokenFromAccount = this.cryptoService.decryptToken(account.getEncryptedRefreshToken());
      if(decryptedTokenFromAccount !== decryptedTokenFromCommand) throw new DifferentTokenError();

    const token =
      await this.jwtService.generateToken(
        {
          id: account.id,
          username: account.username,
          rol: ERoles[account.rol.name]
        }
      )

    const encryptedToken = this.cryptoService.encryptToken(token.refreshToken);
    account.setEncryptedRefreshToken(encryptedToken);

    await this.accountRepository.updateAsync(account);

    return { token: token.accessToken, refreshToken: encryptedToken };

  }

  public async handleDeleteAccount(command: DeleteAccountCommand): Promise<void> {
      const account = await this.accountRepository.findByIdAsync(command.accountId);
      if(!account) throw new AccountNotFoundError();
      await this.accountRepository.deleteAsync(account);
      return;
  }

  public async handleChangePassword(command: ChangePasswordCommand): Promise<void> {
    const account = await this.accountRepository.findByIdAsync(command.accountId);
    if(!account) throw new AccountNotFoundError();
    account.setHashedPasswordAndSalt(await this.cryptoService.hashPassword(command.newPassword));
    await this.accountRepository.updateAsync(account);
    return;
  }

  async handleCreateTokenForInvitation(command: CreateTokenForInvitationCommand): Promise<string> {
    const webAppUrl: string = process.env.WEB_APP_URL;
    const token: string = await this.jwtService.createTokenForInvitation({
      athleteType: command.athleteType,
      availableSessions: command.availableSessions,
      jti: command.jti
    });
    return `${webAppUrl}/signup/${token}`;
  }

  async handleValidateInvitationToken(command: ValidateInvitationTokenCommand): Promise<{
    athleteType: string;
    availableSessions: number
    jti: string
  }> {
    return await this.jwtService.verifyInvitationToken(command.token);
  }

  async handleSeedAdminAccounts(command: SeedAdminAccountsCommand): Promise<void> {
    const adminUsernames: string[] = ["fernanda", "triphasik", "admin1"]
    const password = this.configService.get<string>('ADMIN_PASSWORD')
    const role = await this.roleRepository.findRoleByName("ADMIN");
    if (!role) throw new RoleNotFoundError();

    const hashedPassword = await this.cryptoService.hashPassword(password);

    // Procesar secuencialmente para garantizar orden determinístico
    for (const adminUsername of adminUsernames) {
      const accountExists = await this.accountRepository.findAccountByUsername(adminUsername);

      if (!accountExists) {
        const signUpCommand = new SignUpCommand({
          username: adminUsername,
          password: password,
          rol: role.name,
        });

        const account = Account.constructAccountFromCommand(signUpCommand);
        account.setHashedPasswordAndSalt(hashedPassword);
        account.setRole(role);
        await this.accountRepository.addAsync(account);
      }
    }
  }

  async handleUpdateAccountRole(command: UpdateAccountRoleCommand): Promise<void> {
    const foundAccount = await this.accountRepository.findByIdAsync(command.accountId);
    if(!foundAccount) throw new AccountNotFoundError();
    if(foundAccount.rol.name === 'ADMIN') throw new CantChangeAdminRoleError();
    const role = await this.roleRepository.findRoleByName(command.role);
    if(!role) throw new RoleNotFoundError();

    foundAccount.setRole(role);
    await this.accountRepository.updateAsync(foundAccount);
  }

  async handleRememberIdentity(command: RememberIdentityInformationCommand): Promise<{
    id: number;
    username: string;
    rol: string
  }> {
      const result = await this.jwtService.verifyAuthorizationToken(command.token);
      if(result.ok === false) throw new TokenError(result.error);

      return result.value;

    }
}
