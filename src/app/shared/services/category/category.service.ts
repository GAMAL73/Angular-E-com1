import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { categoryRes } from '../../interfaces/category';
import { ProductRes } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }
  getCategories():Observable<categoryRes>
  {
    return this._HttpClient.get<categoryRes>(`${Environment.baseUrl}/api/v1/categories`)
    }
  getCategoriesProduct(ID:string):Observable<ProductRes>
  {
    return this._HttpClient.get<ProductRes>(`${Environment.baseUrl}/api/v1/products?category[in]=${ID}`)
    }

}
