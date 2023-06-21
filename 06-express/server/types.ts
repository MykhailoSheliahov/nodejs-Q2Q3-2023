export interface Product {
  id: string,
  title: string,
  description: string,
  price: number,
}

export interface ProductItem {
  product: Product,
  count: number,
}

export interface Cart {
  id: string,
  userId?: string,
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
  id: string,
  userId: string,
  cartId: string,
  items: ProductItem[],
  payment: Payment,
  delivery: Delivery,
  comments: string,
  status: string,
  total: number
}
