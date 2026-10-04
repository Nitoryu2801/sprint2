export interface Lot {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  status: 'APPROVED' | 'IN_PROCESS' | 'QUARANTINE' | 'REJECTED';
  expirationDate: string;
  createdAt?: string;
  createAt?: string; // Compatibilidad por si se consume desde otra API
}

export interface CreateLotResource {
  productId: string;
  productName: string;
  quantity: number;
  expirationDate: string;
}
