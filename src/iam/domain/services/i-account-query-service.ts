import { GetAccountByIdQuery } from '../model/queries/get-account-by-id.query';
import { Account } from '../model/aggregates/account';

export interface IAccountQueryService {
  handleGetAccountById(query: GetAccountByIdQuery): Promise<Account>;
}