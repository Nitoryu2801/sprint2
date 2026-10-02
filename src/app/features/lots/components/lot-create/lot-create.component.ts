import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LotsService } from '../../../../core/services/lots.service';
import { CreateLotResource } from '../../../../core/models/lot.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lot-create',
  templateUrl: './lot-create.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./lot-create.component.css']
})
export class LotCreateComponent {
  newLot: CreateLotResource = {
    productId: '',
    productName: '',
    quantity: 0,
    expirationDate: ''
  };

  constructor(private lotsService: LotsService, private router: Router) {}

  onSubmit(): void {
    if (this.newLot.productName && this.newLot.quantity > 0) {
      this.lotsService.createLot(this.newLot).subscribe(() => {
        this.router.navigate(['/lots']);
      });
    }
  }
}
