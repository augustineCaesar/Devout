
import { Injectable } from '@angular/core';
import  {Auth,getAuth,  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut,  sendPasswordResetEmail} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Storage } from '@capacitor/storage';
import {User} from './../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public signedInRegular = false;
  public signedInGoogle = false;
  public storedUID;

  constructor(private auth: Auth, private authx: AngularFireAuth, private router: Router, ) { }

  async register({email, password}) {
    try { 
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.authUser.next(user)
      return user; 
    } catch (error) {
      return null;
    } 
  }

  async login({email, password}) {
    try { 
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.signedInRegular = true;
      this.getUserStore();
      this.setUidInLocalStorage();
      return user;  
    } catch (error) {
      return null;
    } 

  }

  loginMitGoogle(){
    console.log('fat ginger');
      this.authx.signInWithPopup(new GoogleAuthProvider())
      .then((response: any) => {
        console.log('fat ginger2');
        if (response.user) {
          this.router.navigate(['/tabs/tab4']);
          console.dir(response.user);
        }
      });
  }



  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }


  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.authx
      .signInWithPopup(provider)
      .then((result) => {
        this.signedInGoogle = true;
        this.router.navigate(['/tabs/tab3'])
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

   get isLoggedIn(): boolean {
    const user =  this.readUidInLocalStorage();
    return user !== null ? true : false;
  }

  get userData() {
    const user: User = {
      uid : this.auth.currentUser.uid,
      email : this.auth.currentUser.email,
      displayName : this.auth.currentUser.displayName,
      photoURL : this.auth.currentUser.photoURL,
      emailVerified: this.auth.currentUser.emailVerified
    }
    return user;
  }


  async logout() {
    await this.removeUidInLocalStorage();
    return signOut(this.auth);
  }

  // suid --> saved user id --> 
  setUidInLocalStorage = async () => {
    await Storage.set({
      key: 'suid',
      value: JSON.stringify(this.auth.currentUser.uid),
    });
  };
  
  // runs in appcomponent.ts on app startup 
  readUidInLocalStorage  = async () => {
    const   value  = await Storage.get({ key: 'suid' });
    this.storedUID = value.value;
    console.log(value.value);
    return value.value;
  };

  // runs when log out 
  removeUidInLocalStorage  = async () => {
    await Storage.remove({ key: 'suid' });
  };
  
  async passwordResetEmail(email) {
    var message;
    try {
      await sendPasswordResetEmail(this.auth, email);
      message = 'Password email has been sent, check your email'
      return message;
    } catch (error) {
      message =  `Try creating account: user not found`;
      return message;
    }
  }

  getUserStore() {
    // this.storeProvider.getMyStore(this.auth.currentUser.uid);
  }
} 
