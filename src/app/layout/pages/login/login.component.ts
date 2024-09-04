import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errMsg!:string;
  isLoading!:boolean;
  LOginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g)])
  })
  constructor(private _AuthService:AuthService ,private _Router:Router){}
  submitLogin(){
    if(this.LOginForm.valid){
      this.isLoading=true;
      this._AuthService.signin(this.LOginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('userToken',res.token);
          this._AuthService.decodeUserData();
          this._Router.navigate(['/home']);
          this.isLoading=false;
          },
          error: (err) => {
            console.log(err);
            this.errMsg=err.error.message;
            this.isLoading=false;
            }
      })
    }
  }
}
