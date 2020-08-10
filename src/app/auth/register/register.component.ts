import { Component } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "./../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent {
  registerForm = new FormGroup({
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

  
  async onRegister(){
    
    const {email, password} = this.registerForm.value;
    try{
      const user = await this.authSvc.register(email, password);if(user){
        //ir a la homepage
        this.router.navigate(['/verification-email']);

        
      }
    }
    catch(error){console.log(error)}
  }
}
