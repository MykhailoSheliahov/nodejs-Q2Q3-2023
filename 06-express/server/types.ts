export interface Product {
  id: number,
  title: string,
  description: string,
  price: number,
}

export interface ProductItem {
  product: Product,
  count: number,
}

export interface Cart {
  id: number,
  userId?: number,
  items: ProductItem[],
  deleted?: boolean;
}

export interface Delivery {
  type: string,
  address: string
}

export interface Payment {
  type: string,
  address: string,
  creditCard: string
}

export interface Order {
  id: number,
  userId: number,
  cartId: number,
  items: ProductItem[],
  payment: Payment,
  delivery: Delivery,
  comments: string,
  status: string,
  total: number
}

export interface User {
  id?: number,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  role: string,
}
