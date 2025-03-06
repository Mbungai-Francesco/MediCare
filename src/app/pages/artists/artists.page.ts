import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { UserService } from 'src/app/services/user/user.service';
import { Artist, Rating, User } from 'src/app/types';
import { getUser, updateUser } from 'src/app/api/userApi';
import { getArtists, updateArtist } from 'src/app/api/artistApi';
import { RatingService } from 'src/app/services/rating/rating.service';
import { createRating, getRatings } from 'src/app/api/ratingApi';
import { RatingDto } from 'src/app/types/ratingDto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.page.html',
  styleUrls: ['./artists.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule, RouterLink]
})
export class ArtistsPage implements OnInit {
  @ViewChild('messageToaster') messageToaster!: ElementRef;

  user!: User;
  artists: Artist[] = [];
  rating: Rating[] = [];
  filteredArtists: Artist[] = [];

  name = '';

  following!: boolean;
  rated!: boolean;

  showRateSelect: boolean = false;
  artiststIndex !: string;
  rate: number = 0;

  message = '';
  messageStatus!: boolean;

  emptyRating : RatingDto = {
    rate: 0,
    artistId: '',
    userId: ''
  }

  constructor(
    private artistsService: ArtistService,
    private ratingService: RatingService,
    private userService: UserService
  ) {
    userService.user$.subscribe((res) => {
      this.user = res;
      artistsService.artists$.subscribe((res) => {
        this.artists = res;
        this.filteredArtists = res;
        res.forEach((artist, num) => {
          console.log(artist);

          artist.rate = 0;
          if (artist.ratings.length > 0) {
            for (const i of artist.ratings) {
              artist.rate += i.rate;
            }
            const val = Math.floor(artist.rate / artist.ratings.length);
            artist.rate = val == 0 ? 1 : val;
          }
        });
        // artistsService.setArtists(this.artists)
      });
      ratingService.ratings$.subscribe((res) => {
        this.rating = res;
        console.log(this.rating);
      });
    });
  }

  ngOnInit() {}

  refresh(){
    getArtists(this.user.jwt || '').then((val) => {
      if (val) {
        this.artistsService.setArtists(val);
      }
    });
  }

  searchArtistByName(e: Event) {
    const val = e.target as HTMLInputElement;
    this.filteredArtists = this.artists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(val.value.toLowerCase()) ||
        artist.recordLabel.toLowerCase().includes(val.value.toLowerCase())
    );
  }

  followArtist(artistId: string, num: number) {
    if (!this.checkFollow(artistId)) {
      this.user.followingIds.push(artistId);
      this.artists[num].followerIds.push(this.user.id);
      console.log(this.user);
      console.log(this.artists[num]);
    } else {
      const index = this.user.followingIds.findIndex((id) => id === artistId);
      this.user.followingIds.splice(index, 1);

      const artistIndex = this.artists[num].followerIds.findIndex(
        (id) => id === this.user.id
      );
      this.artists[num].followerIds.splice(artistIndex, 1);

      console.log(this.user);
      console.log(this.artists[num]);
    }
    const { jwt, ...noJwt } = this.user;
    updateUser(this.user.id, noJwt, jwt || '').then((res) => {
      if (res) {
        this.userService.setUser(res);
        updateArtist(artistId, this.artists[num], jwt || '').then((val) => {
          if (val) {
            getArtists(jwt || '').then((list) => {
              if (list) this.artistsService.setArtists(this.artists);
            });
          }
        });
      }
    });
  }

  rateIt(id : string) {
    if (this.checkRate(id)) {
      this.message = 'You have already rated this artist';
      this.messageStatus = false;
      this.messageToaster.nativeElement.click();
    }else{
      this.showRateSelect = true;
      this.artiststIndex = id;
    }
  }

  rateArtist() {
    this.showRateSelect = false;
    if(this.rate === 0){ 
      this.message = "Can't rate 0";
      this.messageStatus = false;
      this.messageToaster.nativeElement.click();
    }else{
      this.emptyRating = {
        rate: Number(this.rate),
        artistId: this.artiststIndex,
        userId: this.user.id,
      }
      console.log(this.emptyRating);
      createRating(this.emptyRating, this.user.jwt || '').then((res) => {
        if(res){
          getRatings(this.user.jwt || '').then((val) => {
            if(val){
              this.ratingService.setRatings(val);
              getUser(this.user.id, this.user.jwt || '').then((user) => {
                if(user) this.userService.setUser(user);
              })
            }
          })
        }else{
          this.message = "Rating failed";
          this.messageStatus = false;
          this.messageToaster.nativeElement.click();
        }
      })
    }
  }

  checkFollow(id: string) {
    return this.user.followingIds.includes(id);
  }

  checkRate(id: string) {
    return this.rating.some((rate) => rate.artistId === id);
  }
}
