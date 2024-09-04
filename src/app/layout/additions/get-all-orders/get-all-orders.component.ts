import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-get-all-orders',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './get-all-orders.component.html',
  styleUrl: './get-all-orders.component.scss'
})
export class GetAllOrdersComponent implements OnInit{
  id!:string;
  orders!: any;
  cartItemsList!: any;
  isLoading!:boolean;
  constructor(private _OrderService:OrderService , private _AuthService:AuthService){}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  ngOnInit(): void {
    this.getAllOrder();

  }

  getAllOrder(){
    this.isLoading=true;
    this._AuthService.decodeUserData()
    this.id=this._AuthService.userdata.value.id;
    this._OrderService.getUserOrders(this.id).subscribe({
      next: (res) =>{
        console.log(res);
        this.orders=res;
        this.isLoading=false
      },
      error: (err) => {
        console.log(err)
        }
    })
  }
}
