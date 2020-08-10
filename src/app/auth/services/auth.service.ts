import { Injectable } from '@angular/core';
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { finalize, first } from "rxjs/operators";
import { Observable } from 'rxjs';
import { UserI } from 'src/app/shared/models/user.interface';
import { FileI } from 'src/app/shared/models/file.interface';
import { AngularFireStorage } from "@angular/fire/storage";
@Injectable( {providedIn : 'root'})
export class AuthService {
  public user: User;
  public userData$: Observable<firebase.User>;
  private filePath: string;

  constructor(public afAuth: AngularFireAuth, private storage: AngularFireStorage) { 
    this.userData$ = afAuth.authState;

  }
  async saveUserProfile(user: UserI): Promise<any> {
    (await this.afAuth.currentUser).updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    }).then(() => console.log('User updated'))
      .catch(err => console.log('error', err));
  }
  preSaveUserProfile(user:UserI, image:FileI): void{
    this.uploadImage(user,image);
  }
  private uploadImage(user:UserI, image:FileI): void{
    this.filePath = `images/${image.name}`;
    const fileRef =this.storage.ref(this.filePath);
    const task =this.storage.upload(this.filePath,image);
    task.snapshotChanges().pipe(finalize(()=>{
      fileRef.getDownloadURL().subscribe(urlImage =>{
        user.photoURL = urlImage;
        this.saveUserProfile(user);
      })
    })).subscribe();
  }

  async loginGoogle(){
    try{
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());

    }
    catch(error){
      console.log.apply(error)

    }
  }

  async resetPassword(email:string):Promise<void>{
    try{
      return this.afAuth.sendPasswordResetEmail(email);
    }
    catch(error){console.log(error)}
  }

  async sendVerificationEmail(): Promise<void>{
    return await (await this.afAuth.currentUser).sendEmailVerification();  
  }

  async login(email: string, password:string){
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    }
    catch(error){console.log(error)}

  }
  async register(email: string, password:string){
    try{
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.sendVerificationEmail();
      return result;
    }
    catch(error){console.log(error)}
  }
  async logout(){
    try{
      await this.afAuth.signOut();
    }
    catch(error){console.log(error)}

  }
  getCurrentUser(){
      return this.afAuth.authState.pipe(first()).toPromise();
  }


}
