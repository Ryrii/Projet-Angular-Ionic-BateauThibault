import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter,IonBackButton,IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
@Component({
  selector: 'app-option-detail',
  templateUrl: './option-detail.page.html',
  styleUrls: ['./option-detail.page.scss'],
  standalone: true,
  imports: [IonBackButton,IonButtons, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OptionDetailPage implements OnInit {
  element: { title: string; image: string };
  category: { id: number; name: string; image: string };

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as {
      element: { title: string; image: string },
      category: { id: number; name: string; image: string }
    };
    this.element = state?.element;
    this.category = state?.category;
  }

  ngOnInit() {
  }
}