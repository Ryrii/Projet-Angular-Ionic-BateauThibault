import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonImg, IonAlert,IonBackButton,IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, Product } from '../services/products.service';
import { TabsComponent } from '../tabs/tabs.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TabsComponent, IonIcon, IonImg, IonAlert,IonBackButton,IonButtons],
})
export class ProductsPage implements OnInit {
  category!: { id: number, name: string };
  categoryImage: { [key: number]: string } = {
    0: '../../assets/poissons.jpg',
    1: '../../assets/fruit.jpg',
    2: '../../assets/crustace.jpg',
  };
  productImage!: { [key: number]: string };
  products: Product[] = [];
  isAlertOpen = false;
  alertButtons = ['Ok'];
  productAdded !: string
  productAddedPrice !: string

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private cartService: CartService
  ) { }

  async ngOnInit() {
    this.productImage = this.productService.getProductImages();

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.category = this.router.getCurrentNavigation()?.extras.state?.['category'];
        this.loadProducts();
      }
    });
  }

  loadProducts() {
    if (this.category.id == 3) {
      this.productService.getProductOnSale().subscribe((products: Product[]) => {
        this.products = products;
        console.log(this.products);
      });
    } else {
      this.productService.getProductsByCategory(this.category.id).subscribe((products: Product[]) => {
        this.products = products;
      });
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.setOpen(true);
    this.productAdded = "Produit ajouté au panier : "+product.name
    this.productAddedPrice= "Prix : "+product.price+" €";
  }

}
