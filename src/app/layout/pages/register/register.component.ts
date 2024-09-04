import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errMsg!:string;
  isLoading!:boolean;
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.maxLength(10),Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  },this.checkRepasswodMatch)
  constructor(private _AuthService:AuthService,private _Router:Router){}
  checkRepasswodMatch(g:AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null;
    }else{
      g.get('rePassword')?.setErrors({mismatch:true});
      return {mismatch:true};
    }
  }
  submitFormRegister(){
    this.isLoading=true;
    if(this.registerForm.valid){
      this._AuthService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          this._Router.navigate(['/login'])
          this.isLoading=false;
        },
        error: (err)=>{
          this.errMsg=err.error.message;
          this.isLoading=false;
        }
      })
    }
  }
}
