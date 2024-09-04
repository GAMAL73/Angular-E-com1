import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  constructor(private _AuthService:AuthService ,private _Router:Router){}
  errMsg!:string;
  isLoading!:boolean;
  resetNewPasswordForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g)])
  })
  submitNewPassword(){
    if(this.resetNewPasswordForm.valid){
      this.isLoading=true;
      this._AuthService.resetNewPassword(this.resetNewPasswordForm.value).subscribe({
        next: (res) => {
          this.isLoading=false;
          localStorage.setItem('userToken',res.token);
          this._AuthService.decodeUserData();
          this._Router.navigate(['/home']);
          console.log(res);
          },
          error: (err) => {
            this.isLoading=false;
            this.errMsg = err.error.message;
            console.error(err);
            }
      })
    }
  }
}
