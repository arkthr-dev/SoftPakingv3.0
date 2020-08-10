import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [AuthService],
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl ('');
  

  constructor( private authSvc: AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  async onReset(){
    const email = this.userEmail.value;
    try{
      
    await this.authSvc.resetPassword(email);
    window.alert('Hemos enviado un correo de recuperacon, revisa tu bandeja');
    this.router.navigate(['/login']);
    }
    catch(error){console.log(error)}
  }

}
