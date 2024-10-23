import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

export const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'product-categories',
        loadComponent: () => import('./product-categories/product-categories.page').then( m => m.ProductCategoriesPage)
      },
      {
        path: 'cart',
        loadComponent: () => import('./cart/cart.page').then( m => m.CartPage)
      }
    ],
  },
  
];