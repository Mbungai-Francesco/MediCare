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
      password: ['', Validators.required],
    });
  }

  async showLoading(mes: string, openOrClose: boolean) {
    this.loading.message = mes;
    this.loading.isOpen = openOrClose;
    // this.loading.present();
  }

  login() {
    this.showLoading('Logging in', true);
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      console.log('am in');

      const val = this.loginForm.value;

      loginUser(val.email, val.password).then((user) => {
        this.showLoading('', false);
        if (user) {
          console.log(user);
          this.userService.setUser(user);
          getArtists(user.jwt || '').then((val) => {
            if (val) {
              this.artistsService.setArtists(val);
            }
          });
          userRatings(user.id, user.jwt || '').then((val) => {
            if (val) {
              this.ratingService.setRatings(val);
            }
          });
          this.router.navigate(['/artists']); // Navigate to the desired route
        } else {
          console.log('Error logging user');
          this.message = 'Login Failed';
          this.messageStatus = false;
          this.messageToaster.nativeElement.click();
        }
      });
    }
  }
}
