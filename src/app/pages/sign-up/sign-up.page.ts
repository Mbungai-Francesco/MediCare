import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoadingController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/app/types';
import { UserDto } from 'src/app/types/userDto';
import { UserService } from 'src/app/services/user/user.service';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { getArtists } from 'src/app/api/artistApi';
import { createUser } from 'src/app/api/userApi';
import { userRatings } from 'src/app/api/ratingApi';
import { RatingService } from 'src/app/services/rating/rating.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class SignUpPage implements OnInit {
  registrationForm!: FormGroup;
  fitnessForm!: FormGroup;
  coachForm!: FormGroup;

  @ViewChild('formToaster') formToaster!: ElementRef;
  @ViewChild('formSuccessToaster') formSuccessToaster!: ElementRef;
  @ViewChild('messageToaster') messageToaster!: ElementRef;

  loading!: HTMLIonLoadingElement;
  messageStatus!: boolean;
  message = '';

  emptyUser: UserDto = {
    name: ' ',
    email: ' ',
    password: ' ',
    dateofbirth: new Date(),
  };

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router,
    private userService: UserService,
    private artistsService: ArtistService,
    private ratingService: RatingService
  ) {
    this.loadingCtrl.create({}).then((res) => {
      this.loading = res;
    });
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dateofbirth: ['', Validators.required],
    });
  }

  async showLoading(mes: string, openOrClose: boolean) {
    this.loading.message = mes;
    this.loading.isOpen = openOrClose;
    // this.loading.present();
  }

  signup() {
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      if (new Date() > new Date(this.registrationForm.value.dateofbirth)) {
        this.showLoading('We are creating', true);
        console.log('am in');

        const val = this.registrationForm.value;

        this.emptyUser = {
          name: val.name,
          email: val.email,
          dateofbirth: new Date(val.dateofbirth),
          password: val.password,
        };
        createUser(this.emptyUser).then((res) => {
          this.showLoading('', false);
          if (res) {
            this.userService.setUser(res);
            getArtists(res.jwt || '').then((val) => {
              if (val) {
                this.artistsService.setArtists(val);
              }
            });
            userRatings(res.id,res.jwt || '').then((val) =>{
              if(val){
                this.ratingService.setRatings(val)
              }
            })
            this.router.navigate(['/artists']); // Navigate to the desired route
          }else {
            this.message = 'Creation Failed';
            this.messageStatus = false;
            this.messageToaster.nativeElement.click();
            console.log('Error creating user');
          }
        });
      }else {
        this.message = 'Date is unreached'
        this.messageStatus = false
        this.messageToaster.nativeElement.click()
      }
    }else{
      this.message = 'Inputs wrongly filled'
      this.messageStatus = false
      this.messageToaster.nativeElement.click()
    }
  }
}
