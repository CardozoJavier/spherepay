import BaseResponse from './BaseResponse';

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  tags: string[];
  meta: {
    type: string;
  };
  prices: string[];
  created: string;
  updated: string;
  active: boolean;
}

interface ProductData {
  product: Product;
}

type ProductResponse = BaseResponse<ProductData>;
export default ProductResponse;