import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LotsService } from '../../../../core/services/lots.service';

@Component({
  selector: 'app-lot-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ScrollingModule],
  templateUrl: './lot-list.component.html',
  styleUrl: './lot-list.component.css'
})
export class LotListComponent implements OnInit {
  public readonly lotsService = inject(LotsService);

  // Controles Reactivos
  public searchControl = new FormControl('', { nonNullable: true });
  public statusControl = new FormControl('ALL', { nonNullable: true });

  // Conversión del flujo RxJS a Signals para la vista
  private readonly searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  private readonly statusFilter = toSignal(
    this.statusControl.valueChanges,
    { initialValue: 'ALL' }
  );

  // Filtrado computado y memoizado: solo se recalcula si las dependencias cambian
  public readonly filteredLots = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.statusFilter();

    return this.lotsService.lots().filter(lot => {
      const matchesSearch = !term ||
        lot.id.toLowerCase().includes(term) ||
        lot.productName.toLowerCase().includes(term) ||
        lot.productId.toLowerCase().includes(term);

      const matchesStatus = status === 'ALL' || lot.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  ngOnInit(): void {
    this.lotsService.loadLots();
  }
}
