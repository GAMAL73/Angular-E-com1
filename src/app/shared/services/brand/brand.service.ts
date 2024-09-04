import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _HttpClient:HttpClient) { }
  getAllBrand():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/brands`)
  }
  getAllBrandDetails(id:string):Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/products?brand=${id}`)
  }
}
