import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ERoles } from '../value-objects/e-roles';
import { Account } from '../aggregates/account';
import { SeedRolesCommand } from '../commands/seed-roles.command';

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: ERoles

  @OneToMany(() => Account, account => account.rol)
  account: Account[];

  constructor() { }

  static constructRole(eRole: ERoles): Role {
    const role = new Role();
    role.name = eRole;

    return role;
  }

  public getRoleAsString(): string {
    console.log(this.name.toString());
    return this.name.toString();
  }

}