export interface Deviation {
  id: string;
  lotId: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  status: 'OPEN' | 'IN_INVESTIGATION' | 'RESOLVED';
  reportedAt: Date;
}

export interface CreateDeviationResource {
  lotId: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
}
