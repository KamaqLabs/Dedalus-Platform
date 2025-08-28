export class SignUpCommand {
  public readonly username: string;
  public readonly password: string;
  public readonly rol: string;

  constructor(data: { username: string; password: string; rol: string }) {
    this.username = data.username;
    this.password = data.password;
    this.rol = data.rol;
  }
}