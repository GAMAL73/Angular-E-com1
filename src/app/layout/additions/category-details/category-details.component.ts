import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { product, ProductRes } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit{
  isLoading!:boolean;
  product!:ProductRes;
  constructor(private _CategoryService:CategoryService , private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.getProduct()
  }
  getProduct(){
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe(p => {
      this._CategoryService.getCategoriesProduct(p.get('CategoryId')!).subscribe({
        next:(res)=>{
          console.log(res);
          this.product=res;
          this.isLoading=false;
        }
      })
    })
  }
}
