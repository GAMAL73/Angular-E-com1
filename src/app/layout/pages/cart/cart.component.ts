import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CurrencyPipe ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  data!:Data;
  isLoading!:boolean;
  errMsg!:string;
  constructor(@Inject(PLATFORM_ID) id:object,private _CartService:CartService,private toastr: ToastrService){
    if(isPlatformBrowser(id)){
      localStorage.setItem('currentPage','/cart')
    }
  }
  ngOnInit(): void {
    this.getLoggedCart();
  }
  getLoggedCart()
  {
    this.isLoading=true;
    this._CartService.getLoggedCart().subscribe({
      next: (res) => {
        this.isLoading=false;
        console.log(res.data);
        this.data = res.data;
        },
        error: (err) => {
          this.isLoading=false;
          this.errMsg = err.message;
          }
    })
  }
  upDateProduct(id:string,count:number){
    if(count<=0){
      this.deleteProduct(id);
    }else{
      this._CartService.updateCart(id,count.toString()).subscribe({
        next: (res) => {
          console.log(res);
          this.data=res.data;
          this.toastr.success('Product Updated successfully','',{
            progressBar:true
          });
        },
        error: (err) => {
          console.error(err);
          }
      })
    }

  }
  deleteProduct(id:string){
    this._CartService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.data=res.data;
        this.toastr.success('Product Deleted successfully','',{
          progressBar:true
        });
      }
    })
  }




}


