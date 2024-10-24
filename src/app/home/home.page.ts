import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { arrowForward } from 'ionicons/icons';
register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements AfterViewInit {
  @ViewChildren('swiper') swiperElements: QueryList<any> = new QueryList<any>();

  categories = [
    {
      id: 0,
      name: 'Bateaux',
      image: 'assets/images/bateau0.png',
      elements: [
        { title: 'bateau1', image: 'assets/images/bateau1.jpg' },
        { title: 'bateau2', image: 'assets/images/bateau2.jpg' },
        { title: 'bateau3', image: 'assets/images/bateau3.jpg' },
        { title: 'bateau4', image: 'assets/images/bateau4.jpg' },
      ]
    },
    {
      id: 1,
      name: 'Restaurants',
      image: 'assets/images/resto0.jpg',
      elements: [
        { title: 'resto1', image: 'assets/images/resto1.png' },
        { title: 'resto2', image: 'assets/images/resto2.png' },
        { title: 'resto3', image: 'assets/images/resto3.png' },
        { title: 'resto4', image: 'assets/images/resto4.png' },
        { title: 'resto5', image: 'assets/images/resto5.png' },
        { title: 'resto6', image: 'assets/images/resto6.png' },
      ]
    },
    {
      id: 2,
      name: 'Recettes',
      image: 'assets/images/recette0.jpg',
      elements: [
        { title: 'recette1', image: 'assets/images/recette1.png' },
        { title: 'recette2', image: 'assets/images/recette2.png' },
        { title: 'recette3', image: 'assets/images/recette3.png' },
        { title: 'recette4', image: 'assets/images/recette4.png' },
        { title: 'recette5', image: 'assets/images/recette5.png' },
        { title: 'recette6', image: 'assets/images/recette6.png' },
        { title: 'recette7', image: 'assets/images/recette7.png' },
      ]
    }
  ];

  constructor(private router: Router) {
    addIcons({ 'arrow-forward': arrowForward });
  }

  ngAfterViewInit() {
    this.swiperElements.forEach((element) => {
      const swiper = element.nativeElement;
      Object.assign(swiper, {
        slidesPerView: 2.5,
        spaceBetween: 10,
        freeMode: true
      });
      swiper.initialize();
    });
  }

  goToHomeOptions(category: any) {
    let navigationExtras: NavigationExtras = {
      state: { category }
    };
    this.router.navigate(['home-options'], navigationExtras);
  }

  goToOptionDetail(category: any, element: any) {
    let navigationExtras: NavigationExtras = {
      state: { 
        element: element,
        category: category
      }
    };
    this.router.navigate(['option-detail'], navigationExtras);
  }
}
