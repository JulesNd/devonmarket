import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {ShoppingCart} from '../models/shopping-cart';
import {AppUser} from '../models/app-user';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;
  appUser: AppUser;
  @Input('cart') cart: ShoppingCart;
  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);

    this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
  }
}
