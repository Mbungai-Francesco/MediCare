import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Artist } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private artistsSubject = new BehaviorSubject<Artist[]>([]);
    artists$ = this.artistsSubject.asObservable();
  
    artistsDb?: string | null;
    constructor() {
      const artists = this.artistsSubject.getValue();
      this.artistsDb = localStorage.getItem('artists');
      if (this.artistsDb) {
        this.artistsSubject.next(JSON.parse(this.artistsDb));
      } else {
        localStorage.setItem('artists', JSON.stringify(artists));
      }
    }
  
    setArtists(artists: Artist[]) {
      this.artistsSubject.next(artists);
      localStorage.setItem('artists', JSON.stringify(artists));
    }
    updateArtist(num: number, artist: Artist) {
      const artists = this.artistsSubject.getValue();
      artists[num] = artist;
      this.setArtists(artists);
    }
}
