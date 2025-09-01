export class GetGuestProfileByGuestCodeQuery {
   public readonly guestCode: string;
    constructor(guestCode: string) {
      this.guestCode = guestCode;
    }
}