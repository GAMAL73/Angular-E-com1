import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isLoading!:boolean;
  errMsg!:string;
  constructor(private _AuthService:AuthService,private _Router:Router){}
  emailForm:FormGroup=new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  submitEmail(){
    if(this.emailForm.valid){
      this.isLoading=true;
      this._AuthService.forgetPassword(this.emailForm.value).subscribe({
        next: (res) => {
          this.isLoading=false;
          this._Router.navigate(['/resetCode']);
          console.log(res);
          },
          error: (err) => {
            this.isLoading=false;
            this.errMsg=err.error.message;
          }
      })
    }
  }
}
