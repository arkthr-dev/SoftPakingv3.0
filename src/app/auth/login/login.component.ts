import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "./../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authSvc:AuthService, private router:Router) { }
    async onGoogleLogin(){
      try{
        this.authSvc.loginGoogle();
        this.router.navigate(['/home']);  

      }
      catch(error){console.log(error);}
    }

    async onLogin(){
      
      const {email, password} = this.loginForm.value;
      try{
        const user = await this.authSvc.login(email, password);
        if(user && user.user.emailVerified){
          this.router.navigate(['/home']);
        }
        else if(user){
          this.router.navigate(['/verification-email']);
        }
        else{
          this.router.navigate(['/register'])
        }
      }
      catch(error){console.log(error)}
  }
}


