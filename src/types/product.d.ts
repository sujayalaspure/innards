export interface ProductResponse {
  products: Product[];
}

export interface Product {
  id: number | string;
  title: string;
  description?: string;
  price: number | string;
  discountPercentage?: number | string;
  rating?: Rating | number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail: string;
  images?: string[];
}

export interface Rating {
  rate: number | string;
  count?: number | string;
}
