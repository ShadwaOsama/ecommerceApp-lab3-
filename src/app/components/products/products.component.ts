import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardDirective } from '../../directives/product-card.directive';
import { Icategory } from '../../models/icategory';
import { Iproduct } from '../../models/iproduct';
import { CreditCardFormatPipe } from '../../pipes/credit-card-format.pipe';
import { EgyptianNationalIdPipe } from '../../pipes/egyptian-national-id.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,ProductCardDirective,EgyptianNationalIdPipe,CreditCardFormatPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnChanges {
  products: Iproduct[];
  nationalId: number = 14;
  filteredProducts: Iproduct[];
  boughtProducts: Iproduct[] = [];
  num: number = 16;

  @Output() onProductBought: EventEmitter<Iproduct>;
  @Input() recievedCatId: number = 0; // Define the input property

  constructor() {
    this.products = [
      {id:100,name:"hp laptop",price:50000,quantity:3,imgUrl:"https://fakeimg.pl/300/",catId:1},
      {id:200,name:"dell laptop",price:40000,quantity:0,imgUrl:"https://fakeimg.pl/300/",catId:1},
      {id:300,name:"iphone ",price:70000,quantity:2,imgUrl:"https://fakeimg.pl/300/",catId:2},
      {id:400,name:"oppo ",price:60000,quantity:1,imgUrl:"https://fakeimg.pl/300/",catId:2},
      {id:500,name:"samsung ",price:20000,quantity:0,imgUrl:"https://fakeimg.pl/300/",catId:3},
      {id:600,name:"lenovo ",price:10000,quantity:4,imgUrl:"https://fakeimg.pl/300/",catId:3},
    ];
    this.filteredProducts = this.products;
    this.onProductBought = new EventEmitter<Iproduct>();
  }

  ngOnChanges() {
    this.filterProducts();
  }

  buyProduct(product: Iproduct) {
    if (product.quantity > 0) {
      product.quantity--;
      this.onProductBought.emit(product);
    }
  }

  filterProducts() {
    if (this.recievedCatId == 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((prd) => prd.catId == this.recievedCatId);
    }
  }
}
