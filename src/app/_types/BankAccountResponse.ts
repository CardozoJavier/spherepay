export interface BankAccount {
  id: string;
  customer: string;
  accountHolderName: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccountListResponse {
  data: BankAccount[];
  hasMore: boolean;
  object: string;
  url: string;
} 