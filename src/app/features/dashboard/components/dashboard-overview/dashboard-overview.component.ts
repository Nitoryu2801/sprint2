import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DeviationsService } from '../../../../core/services/deviations.service';

interface DeviceSensor {
  name: string;
  type: string;
  value: string;
  status: 'Normal' | 'Advertencia' | 'Alerta';
}

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.css'
})
export class DashboardOverviewComponent {
  private readonly deviationsService = inject(DeviationsService);

  searchTerm: string = '';
  selectedStatus: string = 'ALL';

  devices: DeviceSensor[] = [
    { name: 'Dispositivo-01', type: 'pH', value: '7.2 pH', status: 'Normal' },
    { name: 'Dispositivo-02', type: 'Turbidez', value: '21.7 NTU', status: 'Normal' },
    { name: 'Dispositivo-03', type: 'Presión', value: '3.8 bar', status: 'Advertencia' },
    { name: 'Dispositivo-04', type: 'Nivel', value: '65 %', status: 'Normal' },
    { name: 'Dispositivo-05', type: 'Cloro', value: '0.2 ppm', status: 'Alerta' },
    { name: 'Dispositivo-06', type: 'Flujo', value: '80 %', status: 'Normal' },
    { name: 'Dispositivo-08', type: 'Presión', value: '5.5 bar', status: 'Alerta' }
  ];

  // Obtenemos las desviaciones reactivas del servicio y mostramos las últimas 3
  public recentDeviations = computed(() => this.deviationsService.deviations().slice(0, 3));

  // Cantidad total de desviaciones para reflejarlo dinámicamente si lo requieres
  public totalDeviations = computed(() => this.deviationsService.deviations().length);

  get filteredDevices(): DeviceSensor[] {
    return this.devices.filter(device => {
      const matchesSearch = device.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        device.type.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'ALL' || device.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }
}
