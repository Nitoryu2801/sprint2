import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DeviationsService } from '../../../../core/services/deviations.service';
import { Deviation } from '../../../../core/models/deviation.model';

@Component({
  selector: 'app-deviation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './deviation-list.component.html',
  styleUrl: './deviation-list.component.css'
})
export class DeviationListComponent implements OnInit {
  deviations: Deviation[] = [];
  searchTerm: string = '';
  selectedSeverity: string = 'ALL';

  constructor(private deviationsService: DeviationsService) {}

  ngOnInit(): void {
    this.deviationsService.getDeviations().subscribe(data => this.deviations = data);
  }

  get filteredDeviations(): Deviation[] {
    return this.deviations.filter(dev => {
      const matchesSearch = dev.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        dev.lotId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        dev.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesSeverity = this.selectedSeverity === 'ALL' || dev.severity === this.selectedSeverity;
      return matchesSearch && matchesSeverity;
    });
  }
}
