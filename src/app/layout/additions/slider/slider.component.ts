import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { category } from '../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit{
  categoryList!:category[];
  isLoading!:boolean;
  constructor(private _CategoryService:CategoryService){}
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
        items: 3
      },
      400: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
    nav: true
  }
  ngOnInit(): void {
    this.getAllCategory();
  }
  getAllCategory(){
    this.isLoading = true;
    this._CategoryService.getCategories().subscribe({
      next: res => {
        this.isLoading = false;
        this.categoryList= res.data;
      },
      error: err => {
        this.isLoading = false;
        console.error(err);
      }
    })

  }
}
