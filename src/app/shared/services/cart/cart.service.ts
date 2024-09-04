import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { cartRes } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userTokenHeader={token: localStorage.getItem('userToken')||''}
  constructor(private _HttpClient:HttpClient) { }
  getProductToCart(productId:string):Observable<any>
    {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/cart`,{productId:productId},{
      headers: this.userTokenHeader
    })
    }
  getLoggedCart():Observable<cartRes>
    {
    return this._HttpClient.get<cartRes>(`${Environment.baseUrl}/api/v1/cart`,{
      headers: this.userTokenHeader
    })
    }
  updateCart(productId:string, count:string):Observable<cartRes>
    {
    return this._HttpClient.put<cartRes>(`${Environment.baseUrl}/api/v1/cart/${productId}`,{count:count} ,{
      headers: this.userTokenHeader
    })
    }
    deleteProduct(productId:string):Observable<cartRes>{
      return this._HttpClient.delete<cartRes>(`${Environment.baseUrl}/api/v1/cart/${productId}`,{
        headers: this.userTokenHeader
      })
    }

}
