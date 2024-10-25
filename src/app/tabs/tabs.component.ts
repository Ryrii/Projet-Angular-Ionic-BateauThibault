import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class TabsComponent implements OnInit {
  cartItemCount !: any;

  constructor(private cartService: CartService) { }

  async ngOnInit() {
    this.cartItemCount = await this.cartService.getProductsCount();
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
}