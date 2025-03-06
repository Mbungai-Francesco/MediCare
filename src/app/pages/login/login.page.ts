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
import { loginUser } from 'src/app/api/userApi';
import { getArtists } from 'src/app/api/artistApi';
import { userRatings } from 'src/app/api/ratingApi';
import { RatingService } from 'src/app/services/rating/rating.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, RouterLink],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  loading!: HTMLIonLoadingElement;
  @ViewChild('messageToaster') messageToaster!: ElementRef;

  messageStatus!: boolean;
  message = '';

  tokenHidden = true;
  restHidden = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private artistsService: ArtistService,
    private loadingCtrl: LoadingController,
    private ratingService: RatingService
  ) {}

  ngOnInit() {
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

  login() {
    // this.showLoading('Logging in', true);
    // this.router.navigate(['/home']);
    if (this.tokenHidden) {
      console.log(this.loginForm.value);

      const val = this.loginForm.value;
      console.log(Math.floor(val.number / 100000000), val.name);
      if (Math.floor(val.number / 100000000) == 6 && val.name != '') {
        this.tokenHidden = false;
        this.restHidden = true;
      }
    }
    else{
      this.router.navigate(['/tabs/tab1']); // Navigate to the desired route
    }
  }
}
