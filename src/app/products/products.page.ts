import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductsService,Product } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class ProductsPage implements OnInit {
  category!: {id:number,name:string};
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService) { }

  ngOnInit() {
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