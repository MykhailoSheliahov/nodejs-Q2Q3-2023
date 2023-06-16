import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  price: number;

  constructor(title: string, description: string, price: number) {
    this.title = title;
    this.description = description;
    this.price = price;
  };
};
