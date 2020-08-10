import { Component, OnInit } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { UserI } from "src/app/shared/models/user.interface";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FileI } from  'src/app/shared/models/file.interface'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService, ReactiveFormsModule, FormsModule],
})
export class ProfileComponent implements OnInit {
  public image: FileI;
  public currentImage: string;
  public isLogged = false;
  public user$ : Observable <any> = this.authSvc.afAuth.user;
  public user = firebase.auth().currentUser;
  
  
  



  constructor(private authSvc: AuthService, private router:Router) {
    
  }
  ngOnInit(){
    this.authSvc.userData$.subscribe(user =>{
      this.initValuesForm(user);
      
    })
  }
  
    onSaveUser(user: UserI): void {
    this.authSvc.preSaveUserProfile(user, this.image);
  }
  handleImage(image: FileI): void{
    this.image =image;
  }
  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl('', Validators.required),
  });
  private initValuesForm(user: UserI): void{
    if(user.photoURL){
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email
    })
  }
  async onLogout(){
    try{
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    }
    catch(error){console.log(error)}
    
  }
  
  
}
