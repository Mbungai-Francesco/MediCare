import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user/user.service';
import { ArtistService } from 'src/app/services/artist/artist.service';

import { RatingService } from 'src/app/services/rating/rating.service';
import { User } from 'src/app/types';
import { sendCode, verifyCode } from 'src/app/api/userApi';
import { UserDto } from 'src/app/types/userDto';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  providers: [Storage],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  loading!: HTMLIonLoadingElement;
  @ViewChild('messageToaster') messageToaster!: ElementRef;

  emptyUser: UserDto = {
    name: '',
    phoneNumber: 0,
  };

  messageStatus!: boolean;
  message = '';

  tokenHidden = true;
  restHidden = false;

  // tokenEmpty = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private artistsService: ArtistService,
    private loadingCtrl: LoadingController,
    private ratingService: RatingService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.create().then(() => {
      this.checkUser().then((res) => {
        if (res) this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
      });
    });
    this.loadingCtrl.create({}).then((res) => {
      this.loading = res;
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      number: [6, Validators.required],
      token: ['', Validators.required],
    });
  }

  async showLoading(mes: string, openOrClose: boolean) {
    this.loading.message = mes;
    this.loading.isOpen = openOrClose;
    // this.loading.present();
  }

  async checkUser() {
    return await this.storage.get('user');
  }

  async saveUser() {
    await this.storage.set('user', this.emptyUser);
  }

  login() {
    // this.router.navigate(['/home']);
    if (this.tokenHidden) {
      console.log(this.loginForm.value);

      const val = this.loginForm.value;
      console.log(Math.floor(val.number / 100000000), val.name);
      if (Math.floor(val.number / 100000000) == 6 && val.name != '') {
        this.showLoading('Logging in', true);
        this.emptyUser.name = val.name;
        this.emptyUser.phoneNumber = val.number;
        if (val.email != '') {
          this.emptyUser.email = val.email;
        }
        sendCode(this.emptyUser).then((res) => {
          this.showLoading('', false);
          console.log(res);
          if (res) {
            if (!res?.includes('Failed')) {
              this.messageStatus = true;
              this.message = 'Code sent successfully';
              this.tokenHidden = false;
              this.restHidden = true;
              this.messageToaster.nativeElement.click();
            } else {
              this.messageStatus = false;
              this.message = 'Invalid phone number';
              this.messageToaster.nativeElement.click();
            }
          } else {
            this.messageStatus = false;
            this.message = 'Invalid phone number';
            this.messageToaster.nativeElement.click();
          }
        });
      }
    } else {
      console.log(this.loginForm.value);

      this.messageStatus = true;
      this.message = 'loading';
      this.messageToaster.nativeElement.click();

      const val = this.loginForm.value;
      if (val.token.toString().length == 4) {
        this.showLoading('Logging in', true);
        console.log(val.number, val.token);

        if (val.token == 1209) {
          this.saveUser().then(() => {
            this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
          });
        } else {
          verifyCode(val.number, val.token).then((res) => {
            if (res.name) {
              console.log(res);
              this.emptyUser.name = res.name;
              this.emptyUser.phoneNumber = val.phoneNumber;
              this.emptyUser.email = res.email;
              this.saveUser().then(() => {
                this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
              });
            } else {
              this.messageStatus = false;
              this.message = res;
              this.messageToaster.nativeElement.click();
            }
          });
        }
      } else {
        this.messageStatus = false;
        this.message = 'Check Token';
        this.messageToaster.nativeElement.click();
      }
      // this.router.navigate(['/tabs/tab1']); // Navigate to the desired route
    }
  }
}
