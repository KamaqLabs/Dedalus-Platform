import { Inject, Injectable } from '@nestjs/common';
import { IAccountQueryService } from '../../../domain/services/i-account-query-service';
import { GetAccountByIdQuery } from '../../../domain/model/queries/get-account-by-id.query';
import { Account } from '../../../domain/model/aggregates/account';
import { ACCOUNT_REPOSITORY_TOKEN } from '../../../domain/repositories/account-repository.token';
import { IAccountRepository } from '../../../domain/repositories/i-account-repository';

@Injectable()
export class AccountQueryService implements IAccountQueryService{
  constructor(
    @Inject(ACCOUNT_REPOSITORY_TOKEN)
    private readonly accountRepository: IAccountRepository<Account>
  ) {
  }

  public async handleGetAccountById(query: GetAccountByIdQuery): Promise<Account | null> {
    return await this.accountRepository.findByIdAsync(query.accountId);
  }
}
