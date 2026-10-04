import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Lot, CreateLotResource } from '../models/lot.model';

@Injectable({
  providedIn: 'root'
})
export class LotsService {
  // Estado interno gestionado por Signals para la interfaz reactiva
  private readonly _lots = signal<Lot[]>([
    {
      id: 'LOT-101',
      productId: 'PROD-001',
      productName: 'Paracetamol 500mg',
      quantity: 50000,
      status: 'APPROVED',
      expirationDate: '2026-12-31',
      createdAt: '2024-01-15T10:00:00Z',
      createAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'LOT-102',
      productId: 'PROD-002',
      productName: 'Amoxicilina 250mg',
      quantity: 30000,
      status: 'QUARANTINE',
      expirationDate: '2025-10-15',
      createdAt: '2024-02-01T08:30:00Z',
      createAt: '2024-02-01T08:30:00Z'
    },
    {
      id: 'LOT-103',
      productId: 'PROD-003',
      productName: 'Ibuprofeno 400mg',
      quantity: 20000,
      status: 'IN_PROCESS',
      expirationDate: '2027-01-20',
      createdAt: '2024-03-10T14:15:00Z',
      createAt: '2024-03-10T14:15:00Z'
    }
  ]);

  private readonly _isLoading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Propiedades públicas expuestas como Signals computadas de solo lectura
  public readonly lots = computed(() => this._lots());
  public readonly isLoading = computed(() => this._isLoading());
  public readonly error = computed(() => this._error());

  constructor() {}

  /**
   * Carga los lotes simulando una petición asíncrona de red.
   */
  public loadLots(): void {
    this._isLoading.set(true);
    this._error.set(null);

    // Simulando latencia de red
    setTimeout(() => {
      this._isLoading.set(false);
    }, 300);
  }

  /**
   * Método de compatibilidad para retornar Observable (por si algún componente lo usa directamente).
   */
  public getLots(): Observable<Lot[]> {
    return of(this._lots());
  }

  /**
   * Obtiene la información detallada de un lote específico por su ID.
   */
  public getLotById(id: string): Observable<Lot> {
    const foundLot = this._lots().find(l => l.id.toLowerCase() === id.toLowerCase());
    if (foundLot) {
      return of(foundLot);
    }
    return throwError(() => new Error(`El lote con ID ${id} no fue encontrado.`));
  }

  /**
   * Registra un nuevo lote en la colección actualizando el estado de forma inmediata.
   */
  public createLot(resource: CreateLotResource): Observable<Lot> {
    const now = new Date().toISOString();
    const newLot: Lot = {
      id: `LOT-${Math.floor(100 + Math.random() * 900)}`,
      productId: resource.productId,
      productName: resource.productName,
      quantity: resource.quantity,
      status: 'IN_PROCESS',
      expirationDate: resource.expirationDate,
      createdAt: now,
      createAt: now
    };

    // Actualiza el Signal interno agregando el nuevo lote al inicio
    this._lots.update(current => [newLot, ...current]);
    return of(newLot);
  }
}
