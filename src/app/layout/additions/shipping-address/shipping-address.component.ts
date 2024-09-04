import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../shared/services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {
  isLoading!:boolean;
  errMsg!:string;
  constructor(private _OrderService:OrderService , private _ActivatedRoute:ActivatedRoute ,private toastr: ToastrService,private _Router:Router){}
  ShippingAddress:FormGroup=new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    city:new FormControl(null,[Validators.required,Validators.pattern(/^[^\W\d_]+\.?(?:[-\s'’][^\W\d_]+\.?)*$/)])
  })
  submitShippingAddress(){
    this.isLoading=true;
    if(this.ShippingAddress.valid){
      this._ActivatedRoute.paramMap.subscribe({
        next:params=>{
          this._OrderService.checkOut(params.get('cartId')!,this.ShippingAddress.value).subscribe({
            next: (res) => {
              window.open(res.session.url,'_self')
              this.isLoading=false;
            },
            error:(err)=>{
              console.log(err);
              this.errMsg=err.error.message;
              this.isLoading=false;
            }
          })
        }
      })

    }
  }
  submitShippingAddressCash(){
    this.isLoading=true;
    if(this.ShippingAddress.valid){
      this._ActivatedRoute.paramMap.subscribe({
        next:params=>{
          this._OrderService.checkOutCash(params.get('cartId')!,this.ShippingAddress.value).subscribe({
            next: (res) => {
              this.isLoading=false;
              this.toastr.success('Your request has been executed successfully','',{
                progressBar:true
              });
              this._Router.navigate(['/allorders']);
              console.log(res);
            },
            error:(err)=>{
              console.log(err);
              this.errMsg=err.error.message;
              this.isLoading=false;
            }
          })
        }
      })

    }
  }
}
