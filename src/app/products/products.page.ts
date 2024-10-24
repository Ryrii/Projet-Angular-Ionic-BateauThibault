import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductsService,Product } from '../services/products.service';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TabsComponent]
})

export class ProductsPage implements OnInit {
  category!: {id:number,name:string};
  categoryImage: { [key: number]: string } = {
    0: '../../assets/poissons.jpg',
  }
  productImage: { [key: number]: string } = {
    0: '../../assets/e.jpg',
    1: '../../assets/filet2.jpg',
    2: '../../assets/filet4.jpg',
    3: '../../assets/poisson2.jpg',
    4: '../../assets/filet2.jpg',
    5: '../../assets/filetDeBar.jpg',
    6: '../../assets/ccc.jpg',
    7: '../../assets/produit.jpg',
    8: '../../assets/produit.jpg',
    9: '../../assets/produit.jpg',
    10: '../../assets/produit.jpg',
    11: '../../assets/produit.jpg',
    12: '../../assets/filet3.jpg',
    13: '../../assets/produit.jpg',
    14: '../../assets/produit.jpg',
    15: '../../assets/produit.jpg',
    16: '../../assets/produit.jpg',
  }
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService) { }

  ngOnInit() {
    console.log(this.categoryImage[0]);

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
        console.log(this.products);
      });
    }
  }
}
