import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

import { ProductItem, Payment, Delivery } from './../types';

@Entity()
export class Order {
  @PrimaryKey({ type: 'number' })
  id!: number;

  @Property()
  userId: string;

  @Property({ type: 'text' })
  cartId: string;

  @Property({ type: 'json', nullable: true })
  items: ProductItem[];

  @Property({ type: 'json', nullable: true })
  payment: Payment;

  @Property({ type: 'json', nullable: true })
  delivery: Delivery;

  @Property({ type: 'text' })
  comments?: string;

  @Property({ type: 'text' })
  status: string;

  @Property({ type: 'number' })
  total: number;

  constructor(userId: string, cartId: string, items: ProductItem[], payment: Payment, delivery: Delivery, comments: string, status: string, total: number) {
    this.userId = userId;
    this.cartId = cartId;
    this.items = items;
    this.payment = payment;
    this.delivery = delivery;
    this.comments = comments;
    this.status = status;
    this.total = total;
  };
};
