export class SignedUpResourceDto {
  id: number;
  username: string;
  rol: string;
  constructor(data: {id: number, username: string, rol: string}) {
    this.id = data.id;
    this.username = data.username;
    this.rol = data.rol;
  }
}