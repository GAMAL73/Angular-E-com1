import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { product, ProductRes } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProudactService {

  constructor(private _HttpClient:HttpClient) { }
  getProduct():Observable<ProductRes>
  {
    return this._HttpClient.get<ProductRes>(`${Environment.baseUrl}/api/v1/products`);
  }
  getProductPage2():Observable<ProductRes>
  {
    return this._HttpClient.get<ProductRes>(`${Environment.baseUrl}/api/v1/products?page=2`);
  }
  getProductId(id:string):Observable<{data:product}>
  {
    return this._HttpClient.get<{data:product}>(`${Environment.baseUrl}/api/v1/products/${id}`);
  }
}
