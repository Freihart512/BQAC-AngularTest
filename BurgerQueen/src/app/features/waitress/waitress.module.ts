import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitressRoutingModule } from './waitress-routing.module';
import { CreateOrderComponent } from './views/create-order/create-order.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  declarations: [
    CreateOrderComponent,
    MenuComponent,
    OrderDetailComponent,
    ProductListItemComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    WaitressRoutingModule
  ]
})
export class WaitressModule { }
