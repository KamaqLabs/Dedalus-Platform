export class SignInCommand {
  public readonly username: string;
  public readonly password: string;

  constructor(data: { username: string; password: string }) {
    this.username = data.username;
    this.password = data.password;
  }
}