import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Order } from './../models/order';
import { ShoppingCart } from './../models/shopping-cart';
import {AppUser} from '../models/app-user';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})

export class ShippingFormComponent implements OnInit, OnDestroy {
  appUser: AppUser;

  @Input('cart') cart: ShoppingCart;
  shipping = {
    name: undefined,
    addressLine1: undefined,
    city: undefined
  };
  userSubscription: Subscription;
  userId: string;
  constructor
  (
  	private router: Router,
  	private orderService: OrderService,
  	private authService: AuthService) { }

  ngOnInit() {
    // tslint:disable-next-line:indent
  	this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

   ngOnDestroy() {
  	this.userSubscription.unsubscribe();
  }

  async placeOrder() {
  	let order  = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
