
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { ShippingAddress } from '../../interfaces/data';
import {Root2 } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  userTokenHeader={token: localStorage.getItem('userToken')||''}
  constructor(private _HttpClient:HttpClient) { }
  checkOut(CartId:string , data:ShippingAddress):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/orders/checkout-session/${CartId}?url=${Environment.baseUrlWebSite}`,{
      ShippingAddress: data
    },
    {
      headers:this.userTokenHeader
    }
    )
  }
  checkOutCash(CartId:string , data:ShippingAddress):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/orders/${CartId}`,{
      ShippingAddress: data
    },
    {
      headers:this.userTokenHeader
    }
    )
  }
  getUserOrders(userId:string):Observable<Root2>
  {
    return this._HttpClient.get<Root2>(`${Environment.baseUrl}/api/v1/orders/user/${userId}`)
  }

}
