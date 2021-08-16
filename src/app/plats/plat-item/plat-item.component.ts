import { Component, Input, OnInit} from '@angular/core';
import { Plat } from 'src/app/models/plat.model';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';  
import { NgForm } from '@angular/forms';
import { Quantity } from 'src/app/models/quantity.model';
import { OrderService } from 'src/app/orders/order.service';
import { ExtendedOrder } from 'src/app/models/orderExtended.model';

@Component({
  selector: 'app-plat-item',
  templateUrl: './plat-item.component.html',
  styleUrls: ['./plat-item.component.css']
})
export class PlatItemComponent implements OnInit {
  faCartPlus =faCartPlus; // supprimer

  // @Input decorator => now "plat" property can be modified from app-plats parent
  // @Input => allows a parent component to update data in the child component
  @Input() plat: Plat;
  @Input() index: number;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
  }

  // rajouterAuPanier(form: NgForm) {
    
  //   const quantity = new Quantity(
  //     form.value.amount,
  //     form.value.meal_id,
  //     this.plat.id
  //   )

  //   const newOrder = new ExtendedOrder(
  //     this.plat.id,
  //     form.value.amount,
  //     form.value.meal_id,
  //     this.plat.label,
  //     this.plat.priceDF
  //   )
  //   this.orderService.addOrder(newOrder);
  // }
}
