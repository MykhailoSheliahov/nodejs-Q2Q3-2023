import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  email: string

  @Property()
  password: string

  @Property()
  first_name: string;

  @Property()
  last_name: string;

  @Property()
  role: string;

  constructor(first_name: string, last_name: string, email: string, password: string, role: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.role = role;
  };
};
