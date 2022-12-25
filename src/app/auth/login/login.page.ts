import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Auth } from '@angular/fire/auth';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit { 

  credentials: FormGroup;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  get email() {
    return this.credentials.get('email');  
  }

  get password() {
    return this.credentials.get('password');
  }

  async register() {
    const loading = this.loadingController.create();
    (await loading).present();
    const user = await this.authService.register(this.credentials.value);
    (await loading).dismiss();

    if (user) {
      const loading = this.loadingController.create({
        message: 'Creating...'
      });
      (await loading).present();
       this.authService.setUidInLocalStorage();
      (await loading).dismiss(); 
      this.router.navigateByUrl('/tabs/tab4', {replaceUrl: true}); 

    } else {
      this.showAlert('Registration failed', 'Please try again'); 
    }
  }

  async login() {

    const loading = this.loadingController.create({
      message: 'Logging in...'
    });
    (await loading).present();
    const user = await this.authService.login(this.credentials.value);
    (await loading).dismiss();

    if (user) {
      // store ui in local storage --! not safe eventually use ionic secure storage
    const loading = this.loadingController.create({
      message: 'Successful..'
    });
    (await loading).present();
     this.authService.setUidInLocalStorage();
    (await loading).dismiss(); 
    console.log('hii manenoz',this.auth.currentUser.uid);
      this.router.navigateByUrl('/tabs/tab4', {replaceUrl: true}); 
    } else {
      this.showAlert('Login failed', 'Please try again'); 
    } 
  }

  async loginGoogle() {
    const loading = this.loadingController.create();
    (await loading).present();
    console.log('fat gingerx');
    // const user = await this.authService.GoogleAuth();
    await this.authService.loginMitGoogle();
    console.log('fat gingery');
    (await loading).dismiss();      
  }


  async showAlert(header, message){

  const alert = this.alertController.create({
      header, message, buttons: ['okay'],
    });
     
    (await alert).present();  
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  sendProfile() {
    this.router.navigate(['/profile'])
  }

}
