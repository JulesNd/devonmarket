import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../product.service';
import { ShoppingCart } from './../models/shopping-cart';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/switchMap';
import {AuthService} from '../auth.service';
import {AppUser} from '../models/app-user';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  appUser: AppUser;


  constructor(
    private auth: AuthService,
    // tslint:disable-next-line:indent
  	private productService: ProductService,
    // tslint:disable-next-line:indent
  	private route: ActivatedRoute,
    // tslint:disable-next-line:indent
  	private cartService: ShoppingCartService
  ) {}

  // tslint:disable-next-line:indent
  	async ngOnInit() {
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

      // tslint:disable-next-line:indent
  		this.cart$ = await this.cartService.getCart();
      // tslint:disable-next-line:indent
  		this.populateProducts();
      // tslint:disable-next-line:indent
  	}

  // tslint:disable-next-line:indent
  	private populateProducts() {
      // tslint:disable-next-line:indent
  		this.productService
      // tslint:disable-next-line:indent
  		.getAll()
      // tslint:disable-next-line:indent
	  	.switchMap(products => {
        // tslint:disable-next-line:indent
	  		// @ts-ignore
        this.products = products;
        // tslint:disable-next-line:indent
	  		return this.route.queryParamMap;
        // tslint:disable-next-line:indent
	  	}).subscribe(params => {
        // tslint:disable-next-line:indent
	  		this.category = params.get('category');
        // tslint:disable-next-line:indent
	  		this.applyFilter();
        // tslint:disable-next-line:indent
	  	});
      // tslint:disable-next-line:indent
  	}

  // tslint:disable-next-line:indent
  	private applyFilter() {
      // tslint:disable-next-line:indent
  		this.filteredProducts = (this.category) ?
        // tslint:disable-next-line:indent
  		this.products.filter(p => p.category === this.category) :
        // tslint:disable-next-line:indent
  		this.products;
      // tslint:disable-next-line:indent
  	}

}
