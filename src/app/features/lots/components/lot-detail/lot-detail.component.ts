import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LotsService } from '../../../../core/services/lots.service';
import { Lot } from '../../../../core/models/lot.model';

@Component({
  selector: 'app-lot-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lot-detail.component.html',
  styleUrl: './lot-detail.component.css'
})
export class LotDetailComponent implements OnInit {
  lotId: string | null = null;
  lot: Lot | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private lotsService: LotsService
  ) {}

  ngOnInit(): void {
    this.lotId = this.route.snapshot.paramMap.get('id');

    if (this.lotId) {
      this.lotsService.getLotById(this.lotId).subscribe({
        next: (data) => {
          this.lot = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.message || 'Error al cargar el lote';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Identificador de lote no válido';
      this.isLoading = false;
    }
  }
}
