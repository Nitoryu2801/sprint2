import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Deviation, CreateDeviationResource } from '../models/deviation.model';

@Injectable({
  providedIn: 'root'
})
export class DeviationsService {
  private deviationsDatabase: Deviation[] = [
    {
      id: 'DEV-001',
      lotId: 'LOT-102',
      severity: 'HIGH',
      description: 'Variación de temperatura en el reactor durante la fase de mezclado',
      status: 'OPEN',
      reportedAt: new Date('2026-10-06')
    },
    {
      id: 'DEV-002',
      lotId: 'LOT-101',
      severity: 'MEDIUM',
      description: 'Discrepancia en el peso del empaque primario',
      status: 'IN_INVESTIGATION',
      reportedAt: new Date('2026-10-08')
    }
  ];

  getDeviations(): Observable<Deviation[]> {
    return of([...this.deviationsDatabase]).pipe(delay(200));
  }

  createDeviation(resource: CreateDeviationResource): Observable<Deviation> {
    const newDeviation: Deviation = {
      id: `DEV-${Math.floor(100 + Math.random() * 900)}`,
      ...resource,
      status: 'OPEN',
      reportedAt: new Date()
    };
    this.deviationsDatabase = [newDeviation, ...this.deviationsDatabase];
    return of(newDeviation).pipe(delay(300));
  }
}
