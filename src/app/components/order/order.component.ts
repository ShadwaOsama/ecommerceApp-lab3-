import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icategory } from '../../models/icategory';
import { Iproduct } from '../../models/iproduct';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule,CommonModule,ProductsComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  categories:Icategory[];
  selectedCatId:number=0
  // recievedTotalPrice:number=0
  productsBought: Iproduct[] = [];
constructor(){
  this.categories=[
    {id:1,name:'Laptop'},
    {id:2,name:'Mobile'},
    {id:3,name:'Tablet'},
  ]
}

sendProduct(product: Iproduct) {
  const existingProduct = this.productsBought.find(p => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
    existingProduct.price = product.price * existingProduct.quantity;
  } else {
    this.productsBought.push({ ...product, quantity: 1 });
  }
}

removeProduct(product: Iproduct) {
  this.productsBought = this.productsBought.filter(p => p !== product);
}
}
