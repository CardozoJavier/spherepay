import BaseResponse from './BaseResponse';
import { Product } from './ProductResponse';

interface ProductListData {
  products: Product[];
}

type ProductListResponse = BaseResponse<ProductListData>;
export default ProductListResponse; 