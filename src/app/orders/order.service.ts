import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../auth/user.model';
import { Order } from '../models/order.model';
import { ExtendedOrder } from '../models/orderExtended.model';
import { Quantity } from '../models/quantity.model';

/**
 * Ce service s'occupe de la gestions des commandes (orders) et est disponible sur tout le site
 */
@Injectable()
export class OrderService {
  ordersChanged = new Subject<ExtendedOrder[]>();
  private orders: ExtendedOrder[] = [];

  constructor(private http: HttpClient) {}

  addOrder(order: ExtendedOrder) {
    this.orders.push(order);
  }

  deleteOrder(index: number) {
    this.orders.splice(index, 1);
    this.ordersChanged.next(this.orders.slice());
  }

  sendOrders() {
    // Get connected user Id from local storage
    const user: User = JSON.parse(localStorage.getItem('userData'));
    const userId = user.id;

    for (let order of this.orders) {
      const quantity = new Quantity(
        order.mealQuantity,
        order.mealId,
        order.platId
      )

      const newOrder = new Order(
        userId,
        8, // 8 => TESTING 23h59min, use 1
        [quantity]
      )
      this.http.put(
        'http://localhost:8080/lunchtime/order/add',
        newOrder
      ).subscribe((respData) => {
        console.log(respData);
      });
    }
  }

  getOrders() {
    return this.orders.slice();
  }
}
