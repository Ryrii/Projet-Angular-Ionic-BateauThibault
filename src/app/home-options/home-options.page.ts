import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonCard,IonButton, IonButtons, IonBackButton} from '@ionic/angular/standalone';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home-options',
  templateUrl: './home-options.page.html',
  styleUrls: ['./home-options.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonCard, IonButton, IonBackButton, CommonModule, FormsModule]
})
export class HomeOptionsPage implements OnInit {
  headerHidden = true;
  lastScrollPosition = 0;
  category: { id: number; name: string; image: string };
  elements: { title: string; image: string }[] = [];
  optionsImages: { [key: number]: string } = {
    0: 'assets/images/bateau000.png',
    1: 'assets/images/options-bateau2.jpg',
    2: 'assets/images/options-bateau3.jpg',
    3: 'assets/images/options-bateau4.jpg',
  };

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.category = navigation?.extras?.state?.['category'];
  }

  ngOnInit() {
    this.elements = [
      { title: 'Element 1', image: 'assets/images/bateau1.jpg' },
      { title: 'Element 2', image: 'assets/images/bateau2.jpg' },
      { title: 'Element 3', image: 'assets/images/bateau3.jpg' },
      { title: 'Element 4', image: 'assets/images/bateau4.jpg' },
    ];
  }

  getOptionsImage(): string {
    return this.optionsImages[this.category.id];
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
