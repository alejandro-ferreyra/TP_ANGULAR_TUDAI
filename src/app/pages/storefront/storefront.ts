import { Component, OnInit, inject, signal } from '@angular/core';
import { StoreService } from '../../services/store';
import { Product } from '../../models/product';
import { ProductListComponent } from '../../components/product-list/product-list';
import { CartComponent } from '../../components/cart/cart';

@Component({
  selector: 'app-storefront',
  standalone: true,
  imports: [CartComponent, ProductListComponent],
  templateUrl: './storefront.html',
  styleUrl: './storefront.css',
})
export class StorefrontComponent implements OnInit {
  // Inyectamos el servicio que trae los productos
  private storeService = inject(StoreService);

  // Señales para el catálogo y el carrito
  catalog = signal<any[]>([]);
  cart = signal<any[]>([]);

  // Carga los productos al inicio
  ngOnInit() {
    this.storeService.getProducts().subscribe((data) => {
      this.catalog.set(data);
    });
  }

  // Agrupa en el carrito
  addToCart(product: any) {
    this.cart.update(currentCart => {
      const existingIndex = currentCart.findIndex(item => item.id === product.id);

      if (existingIndex !== -1) {
        const newCart = [...currentCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: (newCart[existingIndex].quantity || 1) + 1
        };
        return newCart;
      } else {
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  }

  // Remover un ítem usando su índice
  removeFromCart(index: number) {
    this.cart.update(currentCart => {
      const newCart = [...currentCart];
      newCart.splice(index, 1);
      return newCart;
    });
  }

  // Finalizar compra y vaciar carrito
  processOrder() {
    console.log('Compra finalizada. Total de ítems:', this.cart().length);
    this.cart.set([]);
  }

  }
