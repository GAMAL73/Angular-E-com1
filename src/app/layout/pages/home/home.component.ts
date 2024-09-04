import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { ProudactService } from '../../../shared/services/proudact/proudact.service';
import { product } from '../../../shared/interfaces/product';
import { SliderComponent } from '../../additions/slider/slider.component';
import { HomesliderComponent } from "../../additions/homeslider/homeslider.component";
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, HomesliderComponent,RouterLink ,DatePipe ,CurrencyPipe,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  productList!:product[];
  userWord:string='';
  date =new Date();
  isLoading!:boolean;
  cartLoading!:boolean;
  wishList:string[]=[]
  constructor(@Inject(PLATFORM_ID) id:object,private _ProudactService:ProudactService,private _CartService:CartService,private toastr: ToastrService,private _WishlistService:WishlistService){
    if(isPlatformBrowser(id)){
      localStorage.setItem('currentPage','/home')
    }
    this.allProduct()
  }
  ngOnInit(): void {
    this.getNewData();
  }
  allProduct(){
    this.isLoading=true;
    this._ProudactService.getProduct().subscribe({
      next :res =>{
        this.isLoading=false;
        this.productList=res.data;
      },
      error: err=> {
        this.isLoading=false;
        console.log(err);
      },
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
  AddProductToWishlist(productId:string){
    this._WishlistService.addWishList(productId).subscribe({
      next :res =>{
        console.log(res);
        this.wishList=res.data;
        this.toastr.success(res.message,'',{
          progressBar:true
        });
        }
  })
  }

  deleteProduct(id:string){
    this._WishlistService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishList=res.data;
        this.toastr.success('Product Removed successfully','',{
          progressBar:true
        });
      }
    })
  }
  getNewData(){
    this.isLoading = true;
    this._WishlistService.loggedWishList().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishList=res.data.map(
          (item: any) => item._id
        );

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
