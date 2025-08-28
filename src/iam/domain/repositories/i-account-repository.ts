import { IBaseRepository } from '../../../shared/domain/repositories/i-base-repository';

export interface IAccountRepository<Account> extends IBaseRepository<Account> {
  findAccountByUsername(username: string): Promise<Account>;
}