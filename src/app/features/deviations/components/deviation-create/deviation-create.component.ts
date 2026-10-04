import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeviationsService } from '../../../../core/services/deviations.service';

@Component({
  selector: 'app-deviation-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deviation-create.component.html',
  styleUrl: './deviation-create.component.css'
})
export class DeviationCreateComponent implements OnInit {
  deviationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deviationsService: DeviationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.deviationForm = this.fb.group({
      lotId: ['', Validators.required],
      severity: ['LOW', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.deviationForm.valid) {
      this.deviationsService.createDeviation(this.deviationForm.value).subscribe({
        next: () => {
          this.router.navigate(['/deviations']);
        },
        error: (err) => console.error(err)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/deviations']);
  }
}
