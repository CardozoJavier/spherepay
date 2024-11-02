import BaseResponse from './BaseResponse';
import { Price } from './PriceResponse';

interface PriceListData {
  prices: Price[];
}

type PriceListResponse = BaseResponse<PriceListData>;
export default PriceListResponse; 