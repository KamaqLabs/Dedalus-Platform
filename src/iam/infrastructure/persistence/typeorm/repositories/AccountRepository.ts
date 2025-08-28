import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository';
import { Account } from '../../../../domain/model/aggregates/account';
import { IAccountRepository } from '../../../../domain/repositories/i-account-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepository extends BaseRepository<Account>
  implements IAccountRepository<Account> {
  constructor(
    @InjectRepository(Account) private readonly accountRepository: Repository<Account>
  ) {
    super(accountRepository);
  }

  findAccountByUsername(username: string): Promise<Account> {
    return this.accountRepository.findOneBy({ username });
  }
}