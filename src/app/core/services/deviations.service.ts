import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Deviation, CreateDeviationResource } from '../models/deviation.model';

@Injectable({
  providedIn: 'root'
})
export class DeviationsService {
  private readonly _deviations = signal<Deviation[]>([
    {
      id: 'DEV-501',
      lotId: 'LOT-102',
      severity: 'HIGH',
      description: 'Variación de temperatura detectada en cámara fría durante el proceso.',
      status: 'OPEN',
      reportedAt: new Date('2024-02-05T11:20:00Z')
    },
    {
      id: 'DEV-502',
      lotId: 'LOT-103',
      severity: 'MEDIUM',
      description: 'Etiquetado con leve desplazamiento en el empaque secundario.',
      status: 'IN_INVESTIGATION',
      reportedAt: new Date('2024-03-12T09:10:00Z')
    }
  ]);

  // Exposición reactiva de solo lectura mediante Signals
  public readonly deviations = computed(() => this._deviations());

  constructor() {}

  public getDeviations(): Observable<Deviation[]> {
    return of(this._deviations());
  }

  public createDeviation(resource: CreateDeviationResource): Observable<Deviation> {
    const newDeviation: Deviation = {
      id: `DEV-${Math.floor(500 + Math.random() * 400)}`,
      lotId: resource.lotId,
      severity: resource.severity,
      description: resource.description,
      status: 'OPEN', // Estado por defecto para nuevas desviaciones
      reportedAt: new Date() // Se asigna la fecha actual como objeto Date
    };

    // Actualiza el Signal de forma inmediata para que aparezca en el registro y el dashboard
    this._deviations.update(current => [newDeviation, ...current]);
    return of(newDeviation);
  }
}
