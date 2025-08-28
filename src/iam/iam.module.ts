import { Module } from '@nestjs/common';
import { AccountCommandService } from './application/internal/command-services/account-command.service';
import { ACCOUNT_REPOSITORY_TOKEN } from './domain/repositories/account-repository.token';
import { AccountRepository } from './infrastructure/persistence/typeorm/repositories/AccountRepository';
import { ROLE_REPOSITORY_TOKEN } from './domain/repositories/role-repository.token';
import { RoleRepository } from './infrastructure/persistence/typeorm/repositories/RoleRepository';
import { AuthenticationController } from './interfaces/rest/authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './domain/model/aggregates/account';
import { Role } from './domain/model/entities/role';
import { AuthModule } from './infrastructure/auth/auth.module';
import { HashingModule } from './infrastructure/hashing/hashing.module';
import { ApplicationReadyEventHandlerService } from './application/internal/event-handlers/application-ready-event-handler.service';
import { RoleCommandService } from './application/internal/command-services/role-command.service';
import { IamContextFacadeService } from './interfaces/acl/iam-context-facade.service';
import { AccountQueryService } from './application/internal/query-services/account-query.service';

@Module({
  imports: [
    AuthModule,
    HashingModule,
    TypeOrmModule.forFeature([Account, Role])
  ],
  providers: [
    AccountCommandService,
    RoleCommandService,
    {
      provide: ACCOUNT_REPOSITORY_TOKEN,
      useClass: AccountRepository
    },
    {
      provide: ROLE_REPOSITORY_TOKEN,
      useClass: RoleRepository
    },
    ApplicationReadyEventHandlerService,
    IamContextFacadeService,
    AccountQueryService
  ],
  exports: [ACCOUNT_REPOSITORY_TOKEN, ROLE_REPOSITORY_TOKEN, IamContextFacadeService],
  controllers: [AuthenticationController]
})
export class IamModule {}
