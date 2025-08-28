import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { SignUpCommand } from '../commands/sign-up.command';
import { Role } from '../entities/role';

@Entity()
export class Account {

  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    username: string;

  @Column({name: 'hashed_password', type: "text"})
    hashedPassword: string;

  @Column({nullable: true, type: "text"})
    salt: string;

  @ManyToOne(() => Role, role => role.account, {eager: true})
  @JoinColumn({ name: 'rol_id' })
    rol: Role;

  @Column({ type: "text", nullable: true })
  token: string;

  constructor() {
    this.token = '';
  }

  static constructAccountFromCommand(command: SignUpCommand): Account {
    const account = new Account();
    account.username = command.username;
    account.hashedPassword = command.password;

    return account
  }

  public setHashedPasswordAndSalt(bcryptObject: { salt: string, hash:string }): void {
    this.hashedPassword = bcryptObject.hash;
    this.salt = bcryptObject.salt;
  }

  public setEncryptedRefreshToken(encryptedToken: string) {
    this.token = encryptedToken;
  }

  public setRole(role: Role): void {
    this.rol = role;
  }

  public getEncryptedRefreshToken(): string {
    return this.token;
  }

  public deleteEncryptedRefreshToken(): void {
    this.token = '';
  }






}