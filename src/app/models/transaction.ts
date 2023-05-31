export interface ITransaction {
  id: number;
  merchantId: number;
  amount: number;
  userId: number;
  transactionType: ETransactionType;
  date: string;
  accountId: number;
}

export enum ETransactionType {
  SPENT,
  REFUND,
  CASH_BACK,
  PAYMENT
}
