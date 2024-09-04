import { Data } from './../../../shared/interfaces/cart';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { RouterLink } from '@angular/router';
import { product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
  wishlist!:product[];
  id!:any;
  isLoading!:boolean;
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
  constructor(private _WishlistService:WishlistService,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.loggedWishList()
  }
  loggedWishList(){
    this.isLoading = true;
    this._WishlistService.loggedWishList().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlist=res.data;
        this.isLoading = false;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  deleteProduct(id:string){
    this._WishlistService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.id=res.data;
        this.wishlist = this.wishlist.filter((item) => this.id.includes(item._id));
        this.toastr.success('Product Removed successfully','',{
          progressBar:true
        });
      }
    })
  }

}
