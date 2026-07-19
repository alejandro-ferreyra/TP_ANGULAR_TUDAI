import { Component, OnInit, inject } from '@angular/core';
import { StoreService } from '../../services/store';
import { Product } from '../../models/product';
import { ProductFormComponent } from '../../components/product-form/product-form';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  private storeService = inject(StoreService);

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.storeService.getProducts().subscribe((data) => (this.products = data));
  }
  onAddProduct(newProd: Product) {
    this.storeService.addProduct(newProd).subscribe(() => this.loadData());
  }
  onDelete(id: string) {
    this.storeService.deleteProduct(id).subscribe(() => this.loadData());
  }
}
