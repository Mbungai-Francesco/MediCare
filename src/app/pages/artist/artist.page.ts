import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Artist } from 'src/app/types';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from 'src/app/services/artist/artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ArtistPage implements OnInit {

  artists: Artist[] = [];
  artist: Artist = {
    id: '',
    image: '',
    name: '',
    stageName: '',
    numOfAlbums: 0,
    rate: 0,
    ratings: [],
    mediaLinks: [],
    recordLabel: '',
    publishingHouse: '',
    startDate: new Date(),
    followers: [],
    followerIds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  id = ''

  constructor(
    private artistsService: ArtistService,
    private route : ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const param = params.get('id');
      if (param) {
        console.log(param);
        
        this.id = param;
        artistsService.artists$.subscribe((res) => {
          this.artists = res;
          const val = this.artists.find((artist) => {
            return artist.id === this.id
          })
          if(val) this.artist = val
          console.log( this.artist);
        })
      }
    });
   }

  ngOnInit() {
  }

}
