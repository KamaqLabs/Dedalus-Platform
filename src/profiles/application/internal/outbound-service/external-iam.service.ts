import { Inject, Injectable } from '@nestjs/common';
import { IamContextFacadeService } from '../../../../iam/interfaces/acl/iam-context-facade.service';

@Injectable()
export class ExternalIamService {
    constructor(
        @Inject()
        private readonly iamContextFacade: IamContextFacadeService
    ) { }

    public async createAccount(username: string, password: string, rol: string): Promise<number> {
        return await this.iamContextFacade.createAccount(username, password, rol);
    }

    public async deleteAccount(accountId: number): Promise<void> {
        return await this.iamContextFacade.deleteAccount(accountId);
    }

    public async obtainUsernameByAccountId(accountId: number): Promise<string> {
        return await this.iamContextFacade.obtainUsernameByAccountId(accountId);
    }

    public async updateAccountRole(accountId: number, role: string): Promise<void> {
        return await this.iamContextFacade.updateAccountRole(accountId, role);
    }
}
