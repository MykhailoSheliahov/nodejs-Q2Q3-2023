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
  userId: string,
  items: ProductItem[],
  deleted?: boolean;
}
