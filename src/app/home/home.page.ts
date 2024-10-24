import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard } from '@ionic/angular/standalone';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCard, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, CommonModule, FormsModule]
})
export class HomePage {
  categoryList = [
    {id: 0, name: 'Bateaux', image: 'assets/images/bateau0.png'},
    {id: 1, name: 'Restaurants', image: 'assets/images/resto0.jpg'},
    {id: 2, name: 'Recettes', image: 'assets/images/recette0.jpg'},
  ];

  constructor(private router: Router) {}

  onCategory(category: {id: number, name: string, image: string}) {
    let navigationExtras: NavigationExtras = {
      state: {
        category
      }
    };
    const path = '/' + category.name.toLowerCase();
    this.router.navigate(['home-options'], navigationExtras);
  }
}