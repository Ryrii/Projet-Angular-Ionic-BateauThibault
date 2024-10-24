import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonImg, IonButton } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonButton]

})
export class CartPage implements OnInit {

  cartProducts!: any;
  productImage !: { [key: number]: string }

  constructor(
    private storage:Storage,
    private productService: ProductsService,
    private cartService: CartService
  ) { }

  ionViewWillEnter() {
    this.refreshCartProducts();
  }

  async ngOnInit() {
    console.log('cart page');

    this.productImage = this.productService.getProductImages();

    await this.storage.create();
    const cart = await this.cartService.getCart();
    this.cartProducts = Object.values(cart);
    console.log(cart);

    console.log(this.cartProducts);
  }
  trackById(index: number, item: any): number {
    return item.id;
  }
  async clearCart() {
    this.cartService.clearCart()
    this.refreshCartProducts()
  }
  async refreshCartProducts() {
    const cart = await this.cartService.getCart();
    this.cartProducts = Object.values(cart);
  }
  async removeProduct(product: any) {
    this.cartService.removeFromCart(product);
    this.refreshCartProducts();
  }
  async addQuantity(product: any) {
    this.cartService.addQuantity(product);
    this.refreshCartProducts();
  }
}
