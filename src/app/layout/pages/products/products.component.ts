import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProudactService } from '../../../shared/services/proudact/proudact.service';
import { product } from '../../../shared/interfaces/product';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink ,DatePipe ,CurrencyPipe,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
productList!:product[];
userWord:string='';
date =new Date();
isLoading!:boolean;
cartLoading!:boolean;
  constructor(@Inject(PLATFORM_ID) id:object ,private _ProudactService:ProudactService ,private _CartService:CartService,private toastr:ToastrService){
    if(isPlatformBrowser(id)){
      localStorage.setItem('currentPage','/products')
    }
  }
  ngOnInit(): void {
    this.getAllProudact();
  }
  getAllProudact(){
    this.isLoading=true;
    this._ProudactService.getProductPage2().subscribe({
      next: (res) => {
        this.productList=res.data;
        this.isLoading=false;
      }
    })
  }
  AddProductToCart(productId:string){
    this.cartLoading=true;
    this._CartService.getProductToCart(productId).subscribe({
      next :res =>{
        console.log(res);
        this.cartLoading=false;
        this.toastr.success(res.message,'',{
          progressBar:true
        });
        }
  })
  }
}
