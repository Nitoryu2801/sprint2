import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Lot, CreateLotResource } from '../models/lot.model';

@Injectable({
  providedIn: 'root'
})
export class LotsService {
  // Arreglo inicial persistente en la sesión
  private lotsDatabase: Lot[] = [
    {
      id: 'LOT-101',
      productId: 'PROD-01',
      productName: 'Paracetamol 500mg',
      quantity: 5000,
      status: 'APPROVED',
      expirationDate: '2028-12-31',
      createdAt: new Date('2026-10-01')
    },
    {
      id: 'LOT-102',
      productId: 'PROD-02',
      productName: 'Amoxicilina 250mg',
      quantity: 3000,
      status: 'IN_PROCESS',
      expirationDate: '2027-06-30',
      createdAt: new Date('2026-10-05')
    }
  ];

  getLots(): Observable<Lot[]> {
    return of([...this.lotsDatabase]).pipe(delay(200));
  }

  getLotById(id: string): Observable<Lot> {
    const lot = this.lotsDatabase.find(l => l.id === id);
    if (!lot) {
      return throwError(() => new Error('Lote no encontrado'));
    }
    return of(lot).pipe(delay(200));
  }

  createLot(resource: CreateLotResource): Observable<Lot> {
    const newLot: Lot = {
      id: `LOT-${Math.floor(100 + Math.random() * 900)}`,
      ...resource,
      status: 'IN_PROCESS',
      createdAt: new Date()
    };
    this.lotsDatabase = [newLot, ...this.lotsDatabase];
    return of(newLot).pipe(delay(300));
  }
}
