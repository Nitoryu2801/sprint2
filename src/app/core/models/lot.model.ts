export interface Lot {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  status: 'IN_PROCESS' | 'QUARANTINE' | 'APPROVED' | 'REJECTED';
  expirationDate: string;
  createdAt: Date;
}

export interface CreateLotResource {
  productId: string;
  productName: string;
  quantity: number;
  expirationDate: string;
}
