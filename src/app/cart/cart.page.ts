import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonImg, IonButton, IonList,IonItem,IonSelect,IonSelectOption, IonLabel, IonNote, IonFooter, IonAlert } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonButton, IonList,IonItem,IonSelect,IonSelectOption, IonLabel, IonNote ,IonFooter, IonAlert],
  providers: [ModalController]

})
export class CartPage implements OnInit {

  cartProducts!: any;
  productImage !: { [key: number]: string }
  selectedLivraisonPoint !: string;
  openValidateOrder = false;
  openValidateOrderSuccess = false;
  alertButtons = ['Ok'];
  openAlertselect = false;
  validationMessage !: string;
  validateOrderButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Valider',
      role: 'confirm',
      handler: () => {
        this.validateOrderSuccess(true);
      },
    },
  ];


  @ViewChild('mySelect', { static: false })
  mySelect!: IonSelect;


  constructor(
    private storage:Storage,
    private productService: ProductsService,
    private cartService: CartService
  ) { }

  async ionViewWillEnter() {
    const cart = await this.cartService.getCart();
    this.cartProducts = Object.values(cart);
  }

  async ngOnInit() {

    this.productImage = this.productService.getProductImages();

    await this.storage.create();
    const cart = await this.cartService.getCart();
    this.cartProducts = Object.values(cart);
  }
  trackById(index: number, item: any): number {
    return item.id;
  }
  async clearCart() {
    await this.cartService.clearCart()
    this.refreshCartProducts()
  }
  async refreshCartProducts() {
    const cart = await this.cartService.getCart();
    this.cartProducts = Object.values(cart);
  }
  async removeProduct(product: any) {
    await this.cartService.removeFromCart(product);
    this.refreshCartProducts();
  }
  async addQuantity(product: any) {
    await this.cartService.addQuantity(product);
    this.refreshCartProducts();
  }
  getTotalPrice() {
    const totalPrice = this.cartProducts?.reduce((acc: number, product: any) => {
      return acc + product.price * product.quantity;
    }, 0);

    return totalPrice?.toString().includes('.') ? totalPrice?.toString().replace('.',',') + '0€' : totalPrice + ',00€'
  }

  openSelect() {
    this.mySelect.open(); // Ouvrir le ion-select
  }
  onSelectChange(event: any) {
    this.selectedLivraisonPoint = event.detail.value; // Récupère la valeur sélectionnée
  }
  validateOrder(isOpen: boolean) {
    console.log('validate order', this.selectedLivraisonPoint);

    if (!this.selectedLivraisonPoint) {
      this.openAlertselect = isOpen;
      return
    }
    this.openValidateOrder = isOpen;
    console.log(this.openValidateOrder);

  }
  validateOrderSuccess(isOpen: boolean) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    let daysUntilNextDelivery = 0;

    if (currentDay <= 3) {
      daysUntilNextDelivery = 3 - currentDay;
    } else if (currentDay <= 6) {
      daysUntilNextDelivery = 6 - currentDay;
    } else {
      daysUntilNextDelivery = 0;
    }

    const nextDeliveryDate = new Date(currentDate);
    nextDeliveryDate.setDate(currentDate.getDate() + daysUntilNextDelivery);

    this.validationMessage = 'Vous pouvez récupérer votre commande au point de livraison : ' + this.selectedLivraisonPoint + ', le ' + nextDeliveryDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) ;
    this.openValidateOrderSuccess = isOpen;
    this.clearCart();
  }
}
