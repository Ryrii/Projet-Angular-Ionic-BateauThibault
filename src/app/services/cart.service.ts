import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any>({});
  cart$ = this.cart.asObservable();
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.loadCart();
  }

  async loadCart() {
    const cart = await this.storage.get('cart') || {};
    this.cart.next(cart);
    this.updateCartItemCount(cart);
  }

  async addToCart(product: any) {
    const cart = await this.storage.get('cart') || {};
    if (cart[product.id]) {
      cart[product.id].quantity++;
    } else {
      cart[product.id] = { ...product, quantity: 1 };
    }
    await this.storage.set('cart', cart);
    this.cart.next(cart);
    console.log(cart)
    this.updateCartItemCount(cart);


  }
  async getCart() {
    return this.storage.get('cart');
  }
  async clearCart() {
    await this.storage.set('cart', {});
    this.cart.next({});
    this.updateCartItemCount({});
  }
  async removeFromCart(product: any) {
    const cart = await this.storage.get('cart') || {};
    if (cart[product.id]) {
      if (cart[product.id].quantity > 1) {
        cart[product.id].quantity--;
      } else {
        delete cart[product.id];
      }
      await this.storage.set('cart', cart);
      this.cart.next(cart);
      this.updateCartItemCount(cart);

    }
  }
  async addQuantity(product: any) {
    const cart = await this.storage.get('cart') || {};
    if (cart[product.id]) {
      cart[product.id].quantity++;
      await this.storage.set('cart', cart);
      this.cart.next(cart);
    }
  }
  async getProductsCount() {
    const cart = await this.storage.get('cart') || {};
    return Object.values(cart).length;
  }
  private updateCartItemCount(cart: { [key: string]: any }) {
    const itemCount = Object.values(cart).reduce((acc, item: any) => acc + item.quantity, 0);
    this.cartItemCount.next(itemCount);
  }
}


