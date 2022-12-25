
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  credentials: FormGroup;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private fb: FormBuilder,
    private router: Router,
    
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

  async showAlert(header, message){

    const alert = this.alertController.create({
        header, message, buttons: ['okay'],
      });
       
      (await alert).present();  
    }

}
