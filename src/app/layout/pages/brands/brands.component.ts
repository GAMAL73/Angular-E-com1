import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  brandList!:any[];
  isLoading!:boolean;
  constructor(@Inject(PLATFORM_ID) id:object,private _BrandService:BrandService){
    if(isPlatformBrowser(id)){
      localStorage.setItem('currentPage','/brands')
    }
  }
  ngOnInit(): void {
    this.getAllBrand();
  }
  getAllBrand(){
    this.isLoading = true;
    this._BrandService.getAllBrand().subscribe({
      next: (res) => {
        this.brandList=res.data;
        console.log(this.brandList);
        this.isLoading = false;
      }
    })
  }
}
