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
      },
      {
        path: 'products',
        loadComponent: () => import('./products/products.page').then( m => m.ProductsPage)
      },
      {
        path: 'home-options',
        loadComponent: () => import('./home-options/home-options.page').then( m => m.HomeOptionsPage)
      },
    ],
  },
  {
    path: 'option-detail',
    loadComponent: () => import('./option-detail/option-detail.page').then( m => m.OptionDetailPage)
  },
  
];