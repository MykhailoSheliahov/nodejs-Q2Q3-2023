import { ObjectId } from 'mongodb';

export interface Product {
  id?: string,
  _id?: ObjectId,
  title: string,
  description: string,
  price: number,
}

export interface ProductItem {
  product: Product,
  count: number,
}

export interface Cart {
  id?: string,
  _id?: string,
  userId?: string,
  items: ProductItem[],
  deleted?: boolean;
}

export interface Order {
  _id?: string,
  id?: string,
  userId?: string,
  cartId?: string,
  items: ProductItem[],
  payment: {
    type: string,
    address: string,
    creditCard: string
  },
  delivery: {
    type: string,
    address: string
  },
  comments: string,
  status: string,
  total: number
}
