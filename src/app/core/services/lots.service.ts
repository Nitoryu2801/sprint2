import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Lot, CreateLotResource } from '../models/lot.model';

@Injectable({
  providedIn: 'root'
})
export class LotsService {
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

  // subject reactivo que mantendra la lista actualizada
  private lotsSubject = new BehaviorSubject<Lot[]>([...this.lotsDatabase]);
  public lots$ = this.lotsSubject.asObservable();

  getLots(): Observable<Lot[]> {
    // emitimos siempre la lista actual del subject
    this.lotsSubject.next([...this.lotsDatabase]);
    return this.lots$;
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

    // Agregamos al inicio del arreglo en memoria
    this.lotsDatabase = [newLot, ...this.lotsDatabase];

    // Notificamos a la app que hay un nuevo lote
    this.lotsSubject.next([...this.lotsDatabase]);

    return of(newLot).pipe(delay(300));
  }
}
