import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductFormComponent {
  @Output() productCreated = new EventEmitter<Product>();
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      size: ['', Validators.required],
      imageUrl: [''],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productCreated.emit(this.productForm.value);
      this.productForm.reset({ category: '' });
    }
  }
}
