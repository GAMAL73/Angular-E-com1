import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit{
  brand!:product[];
  isLoading!:boolean;
  constructor(private _BrandService:BrandService ,private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.getBrandDetails()
  }

  getBrandDetails(){
    this.isLoading=true;
    this._ActivatedRoute.paramMap.subscribe({
      next:params => {
        this._BrandService.getAllBrandDetails(params.get('brandId')!).subscribe({
          next: (res) => {
            console.log(res.data);
            this.brand = res.data;
            this.isLoading=false;
            },
            error: (err) => {
              console.error(err);
              this.isLoading=false;
              }
        })
      }

    })

  }
}
