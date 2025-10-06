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




    public async obtainInvitationUrl(email:string, jti: string): Promise<string> {
        return await this.iamContextFacade.obtainInvitationUrl(email, jti);
    }

    public async validateTokenInvitation(token: string): Promise<boolean> {
        const payload =  await this.iamContextFacade.obtainInvitationTokenPayload(token);
        if(payload) return true;
    }

    public async obtainInformationFromTokenInvitation(token: string): Promise<{ email: string, jti: string }> {
        return await this.iamContextFacade.obtainInvitationTokenPayload(token);
    }


}
