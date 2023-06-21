import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { ProductItem } from './../types';

@Entity()
export class Cart {
  @PrimaryKey()
  id!: number;

  @Property()
  userId: string;

  @Property()
  deleted: boolean;

  @Property({ type: 'json', nullable: true })
  items: ProductItem[];

  constructor(userId: string, deleted: boolean, items: ProductItem[]) {
    this.userId = userId;
    this.deleted = deleted;
    this.items = items;
  };
};
