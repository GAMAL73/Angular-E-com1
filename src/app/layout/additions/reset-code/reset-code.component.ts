
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss'
})
export class ResetCodeComponent {
  constructor(private _AuthService:AuthService ,private _Router:Router){}
  errMsg!:string;
  isLoading!:boolean;
  codeForm:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{4,}$/)])
  })
  submitCodeForm(){
    if(this.codeForm.valid){
      this.isLoading=true;
      this._AuthService.resetCode(this.codeForm.value).subscribe({
        next: (res) => {
          this.isLoading=false;
          this._Router.navigate(['/newPassword']);
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
