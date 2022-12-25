import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

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
    })
  }

  get email() {
    return this.credentials.get('email');  
  }

  async resetPasswordEmail() {
    const loading = this.loadingController.create({
      message: 'please wait...'
    });
    (await loading).present();
    const errorMessage = await this.authService.passwordResetEmail(this.credentials.value.email);
    (await loading).dismiss();
    this.showAlert('goodsoko says: ', errorMessage);
  }

  async showAlert(header, message){
    const alert = this.alertController.create({
        header, message, buttons: ['okay'],
      });
       
      (await alert).present();  
    }

}
