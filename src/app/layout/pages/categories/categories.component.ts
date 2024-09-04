import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { category } from '../../../shared/interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  categoryList!:category[];
  isLoading!:boolean;
id: any|string;
  constructor(@Inject(PLATFORM_ID) id:object , private _CategoryService:CategoryService){
    if(isPlatformBrowser(id)){
      localStorage.setItem('currentPage','/categories')
    }
  }
  ngOnInit(): void {
    this.getAllCategory()
  }
  getAllCategory(){
    this.isLoading = true;
    this._CategoryService.getCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoryList = res.data;
        this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          }
    })
  }
}
