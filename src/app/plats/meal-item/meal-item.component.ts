import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';  
import { Meal } from 'src/app/models/meal.model';
import { ExtendedOrder } from 'src/app/models/orderExtended.model';
import { Quantity } from 'src/app/models/quantity.model';
import { OrderService } from 'src/app/orders/order.service';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.css']
})
export class MealItemComponent implements OnInit {
  faCartPlus =faCartPlus;
  @Input() meal: Meal;
  @Input() platId: number;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
  }

  rajouterAuPanier(form: NgForm) {
    const newOrder = new ExtendedOrder(
      this.platId,
      form.value.amount,
      form.value.meal_id,
      this.meal.label,
      this.meal.priceDF
    )
    this.orderService.addOrder(newOrder);
  }

}
