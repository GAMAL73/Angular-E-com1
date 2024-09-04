import { Component, OnInit } from '@angular/core';
import { ProudactService } from '../../../shared/services/proudact/proudact.service';
import { product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  product!:product;
  isLoading:boolean=true;
  isLoadingCart!:boolean;
  constructor(private _ProudactService:ProudactService, private _ActivatedRoute:ActivatedRoute,private _CartService:CartService,private toastr: ToastrService){}
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
    this.getProductId();
  }
  getProductId(){
    let id:string='';
    this._ActivatedRoute.params.subscribe({
      next:params => {
        id=params['id'];
    }
  })
    this._ProudactService.getProductId(id).subscribe({
      next: res => {
        console.log(res);
        this.product = res.data;
        this.isLoading=false;
      },
      error: err =>{
        console.error(err);
        this.isLoading=false;
      }
    })
  }
  AddProductToCart(productId:string){
    this.isLoadingCart=true;
    this._CartService.getProductToCart(productId).subscribe({
      next :res =>{
        console.log(res);
        this.isLoadingCart=false;
        this.toastr.success(res.message,'',{
          progressBar:true
        });
        }
  })
  }
}
