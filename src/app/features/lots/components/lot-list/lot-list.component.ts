import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LotsService } from '../../../../core/services/lots.service';
import { Lot } from '../../../../core/models/lot.model';

@Component({
  selector: 'app-lot-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lot-list.component.html',
  styleUrl: './lot-list.component.css'
})
export class LotListComponent implements OnInit {
  lots: Lot[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'ALL';

  constructor(private lotsService: LotsService) {}

  ngOnInit(): void {
    this.lotsService.getLots().subscribe(data => this.lots = data);
  }

  get filteredLots(): Lot[] {
    return this.lots.filter(lot => {
      const matchesSearch = lot.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lot.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lot.productId.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'ALL' || lot.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }
}
