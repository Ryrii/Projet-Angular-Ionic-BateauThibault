import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
    id: number;
    name: string;
    category: number;
    price: number;
    unit: string;
    availability: boolean;
    sale: boolean;
    discount: number;
    comments: string;
    owner: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private apiUrl = 'http://51.255.166.155:1352/tig/products/'

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        console.log(this.apiUrl);

        return this.http.get<Product[]>(this.apiUrl);
    }
    getProductsByCategory(categoryId: number): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl).pipe(
            map((products: Product[]) => products.filter((product: Product) => product.category === categoryId))
        );
    }
    getProductOnSale(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl).pipe(
            map((products: Product[]) => products.filter((product: Product) => product.sale === true))
        )
    }
    getProductImages(): { [key: number]: string } {
      return {
        0: '../../assets/e.jpg',
        1: '../../assets/filet2.jpg',
        2: '../../assets/filet4.jpg',
        3: '../../assets/poisson2.jpg',
        4: '../../assets/filet2.jpg',
        5: '../../assets/filetDeBar.jpg',
        6: '../../assets/moule.jpg',
        7: '../../assets/huitre4.jpg',
        8: '../../assets/huitre6.jpg',
        9: '../../assets/crabe.jpg',
        10: '../../assets/bouquet.jpg',
        11: '../../assets/produit.jpg',
        12: '../../assets/filet3.jpg',
        13: '../../assets/huitre3.jpg',
        14: '../../assets/huitre2.jpg',
        15: '../../assets/huitre5.jpg',
        16: '../../assets/huitre.jpg',
      }
    }
}
