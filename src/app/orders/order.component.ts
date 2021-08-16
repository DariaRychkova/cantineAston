import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../models/order.model';
import { ExtendedOrder } from '../models/orderExtended.model';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: ExtendedOrder[] = [];
  subscription: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // When Orders is updated in the meal-item.ts we update the view of list recipes
    this.subscription = this.orderService.ordersChanged
      .subscribe((orders: ExtendedOrder[]) => {
        this.orders = orders;
      })
    // 1st initialisation - Get copy not reference of the recipes
    this.orders = this.orderService.getOrders();
    console.log(this.orders);
  }

  onDeleteMeal(index: number) {
    this.orderService.deleteOrder(index);
  }

  onSendOrders() {
    this.orderService.sendOrders();
  }

}
