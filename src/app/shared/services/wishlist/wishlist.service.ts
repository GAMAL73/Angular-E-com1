import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../base/Environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }
  userTokenHeader={token: localStorage.getItem('userToken')||''}
  addWishList(productId:string):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/wishlist`,{
      productId: productId
    },
    {
      headers:this.userTokenHeader
    }
    )
  }
  loggedWishList():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/wishlist`,{
      headers:this.userTokenHeader
    }
    )
  }
  deleteProduct(productId:string):Observable<any>
  {
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/wishlist/${productId}`,{
      headers: this.userTokenHeader
    })
  }
}
