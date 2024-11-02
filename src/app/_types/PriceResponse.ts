import BaseResponse from './BaseResponse';

export interface Price {
  id: string;
  currency: string;
  network: string;
  unitAmountDecimal: string;
  unitAmount: string;
  product: string;
  created: string;
  updated: string;
}

interface PriceData {
  price: Price;
}

type PriceResponse = BaseResponse<PriceData>;
export default PriceResponse; 