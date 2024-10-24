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
    1: '../../assets/fruit.jpg',
    2: '../../assets/crustace.jpg',
  }
  productImage: { [key: number]: string } = {
    0: '../../assets/e.jpg',
    1: '../../assets/filet2.jpg',
    2: '../../assets/filet4.jpg',
    3: '../../assets/poisson2.jpg',
    4: '../../assets/filet2.jpg',
    5: '../../assets/filetDeBar.jpg',
    6: '../../assets/moule.jpg',
    7: '../../assets/huitre4.jpg',
    8: '../../assets/huitre6.jpg',
    9: '../../assets/crabe.jpg',
    10: '../../assets/bouquet.jpg',
    11: '../../assets/produit.jpg',
    12: '../../assets/filet3.jpg',
    13: '../../assets/huitre3.jpg',
    14: '../../assets/huitre2.jpg',
    15: '../../assets/huitre5.jpg',
    16: '../../assets/huitre.jpg',
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
