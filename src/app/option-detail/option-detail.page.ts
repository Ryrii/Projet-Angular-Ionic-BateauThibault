import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonBackButton, IonButtons, IonButton, IonIcon, ActionSheetController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { shareOutline, heartOutline, heart, starOutline, star, logoWhatsapp, logoFacebook, logoTwitter, close } from 'ionicons/icons';

// 在构造函数中：
addIcons({ shareOutline, heartOutline, heart, starOutline, star, logoWhatsapp, logoFacebook, logoTwitter, close });
@Component({
  selector: 'app-option-detail',
  templateUrl: './option-detail.page.html',
  styleUrls: ['./option-detail.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, CommonModule, FormsModule]
})
export class OptionDetailPage implements OnInit {
  element: { title: string; image: string; description: string };
  category: { id: number; name: string; image: string };
  isLiked: boolean = false;
  isFavorited: boolean = false;

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController
  ) {
    addIcons({ shareOutline, heartOutline, heart, starOutline, star });
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as {
      element: { title: string; image: string; description: string },
      category: { id: number; name: string; image: string }
    };
    this.element = state?.element;
    this.category = state?.category;

    if (!this.element.description) {
      this.element.description = `Voici la description de ${this.element.title}. Il appartient à la catégorie ${this.category.name}, et c'est l'une de nos spécialités. Nous espérons que vous apprécierez cette expérience unique.`;
    }
  }

  ngOnInit() {
  }

  async onShare() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Partager',
      buttons: [
        {
          text: 'partager sur WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            console.log('partager sur WhatsApp');
          }
        },
        {
          text: 'partager sur Facebook',
          icon: 'logo-facebook',
          handler: () => {
            console.log('partager sur Facebook');
          }
        },
        {
          text: 'partager sur Twitter',
          icon: 'logo-twitter',
          handler: () => {
            console.log('partager sur Twitter');
          }
        },
        {
          text: 'annuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('annuler');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  onLike() {
    this.isLiked = !this.isLiked;
    console.log('État J\'aime :', this.isLiked);
  }

  onFavorite() {
    this.isFavorited = !this.isFavorited;
    console.log('État Favoris :', this.isFavorited);
  }
}
