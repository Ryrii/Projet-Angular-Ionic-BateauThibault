import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonLabel, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonLabel, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton],
})
export class ProductCategoriesPage implements OnInit {

  categoryList = [
    {id:0, name:'Poissons'},
    {id:1, name:'Fruits de Mer'},
    {id:2, name:'Crustacés'},
    {id:3, name:'Promotions'},
  ]

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onCategory(category:{id:number,name:string}) {
    let navigationExtras : NavigationExtras = {
      state: {
        category
      }
    }
    this.router.navigate(['/products'], navigationExtras);
  }
}
