

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { code, EmailData, LogInData, newPassword, registerData} from '../../interfaces/data';
import { Environment } from '../../../base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userdata:BehaviorSubject<any>=new BehaviorSubject(null)
  constructor(private _HttpClient:HttpClient,private _Router:Router,@Inject(PLATFORM_ID) id:object) {
    if(isPlatformBrowser(id)){
      if (localStorage.getItem('userToken')) {
        this.decodeUserData()
        // _Router.navigate([localStorage.getItem('currentPage')])
      }
    }
  }
  signUp(data:registerData):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signup`,data);
  }
  signin(data:LogInData):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signin`,data);
  }
decodeUserData(){
  const token =JSON.stringify(localStorage.getItem('userToken'));
  const decoded = jwtDecode(token);
  this.userdata.next(decoded);
  console.log(this.userdata.getValue());
}
logOut(){
  localStorage.removeItem('userToken');
  this.userdata.next(null);
  this._Router.navigate(['/login'])
}
forgetPassword(data:EmailData):Observable<any>
{
  return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/forgotPasswords`,data);
}
resetCode(data:code):Observable<any>
{
  return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/verifyResetCode`,data);
}
resetNewPassword(data:newPassword):Observable<any>
{
  return this._HttpClient.put(`${Environment.baseUrl}/api/v1/auth/resetPassword`,data);
}
}
