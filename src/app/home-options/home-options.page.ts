import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonCard,IonButton, IonButtons, IonBackButton} from '@ionic/angular/standalone';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-options',
  templateUrl: './home-options.page.html',
  styleUrls: ['./home-options.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonCard, IonButton, IonBackButton, CommonModule, FormsModule]
})
export class HomeOptionsPage implements OnInit {
  headerHidden = false;
  lastScrollPosition = 0;
  category: any
  elements: { title: string; image: string }[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.category = this.router.getCurrentNavigation()?.extras.state?.['category'];
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.category = this.router.getCurrentNavigation()?.extras.state?.['category'];
    }
    this.loadElements();
  }

  getOptionsImage(): string {
    switch(this.category.id) {
      case 0:
        return 'assets/images/bateau000.png';
      case 1:
        return 'assets/images/resto00.png';
      case 2:
        return 'assets/images/restau000.png';
      default:
        return 'assets/images/default_options.jpg';
    }
  }
  loadElements() {
    console.log('Loading elements for category:', this.category.id);
    switch(this.category.id) {
      case 0:
        this.elements = [
          { title: 'bateau1', image: 'assets/images/bateau1.jpg' },
          { title: 'bateau2', image: 'assets/images/bateau2.jpg' },
          { title: 'bateau3', image: 'assets/images/bateau3.jpg' },
          { title: 'bateau4', image: 'assets/images/bateau4.jpg' },
        ];
        break;
      case 1:
        this.elements = [
          { title: 'resto1', image: 'assets/images/resto1.png' },
          { title: 'resto2', image: 'assets/images/resto2.png' },
          { title: 'resto5', image: 'assets/images/resto5.png' },
          { title: 'resto6', image: 'assets/images/resto6.png' },
          { title: 'resto3', image: 'assets/images/resto3.png' },
          { title: 'resto4', image: 'assets/images/resto4.png' },
        ];
        break;
      case 2:
        this.elements = [
          { title: 'recette1', image: 'assets/images/recette1.png' },
          { title: 'recette2', image: 'assets/images/recette2.png' },
          { title: 'recette3', image: 'assets/images/recette3.png' },
          { title: 'recette4', image: 'assets/images/recette4.png' },
          { title: 'recette5', image: 'assets/images/recette5.png' },
          { title: 'recette6', image: 'assets/images/recette6.png' }, 
          { title: 'recette7', image: 'assets/images/recette7.png' },
        ];
        break;
    }
  }


  onContentScroll(event: CustomEvent) {
    const scrollPosition = event.detail.scrollTop;
    if (scrollPosition > this.lastScrollPosition && scrollPosition > 5) {
      this.headerHidden = true;
    } else if (scrollPosition < this.lastScrollPosition) {
      this.headerHidden = false;
    }
    this.lastScrollPosition = scrollPosition;
  }
  goToDetail(element: { title: string; image: string }) {
    let navigationExtras: NavigationExtras = {
      state: {
        element: element,
        category: this.category
      }
    };
    this.router.navigate(['/option-detail'], navigationExtras);
  }
}
