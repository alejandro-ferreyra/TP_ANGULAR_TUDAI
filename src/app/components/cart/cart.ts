import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { DecimalPipe } from '@angular/common';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  @Input() cartItems: CartItem[] = [];
  @Output() remove = new EventEmitter<number>();
  @Output() checkout = new EventEmitter<void>();

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      const qty = item.quantity || 1;
      return acc + (price * qty);
    }, 0);
  }
}
