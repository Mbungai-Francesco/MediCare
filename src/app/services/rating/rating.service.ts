import { Injectable } from '@angular/core';
import { Rating } from '../../types';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratingsSubject = new BehaviorSubject<Rating[]>([]);
  ratings$ = this.ratingsSubject.asObservable();

  ratingsDb?: string | null;
  constructor() {
    const ratings = this.ratingsSubject.getValue();
    this.ratingsDb = localStorage.getItem('ratings');
    if (this.ratingsDb) {
      this.ratingsSubject.next(JSON.parse(this.ratingsDb));
    } else {
      localStorage.setItem('ratings', JSON.stringify(ratings));
    }
  }

  setRatings(ratings: Rating[]) {
    this.ratingsSubject.next(ratings);
    localStorage.setItem('ratings', JSON.stringify(ratings));
  }
  updateRatings(ratings: Rating[]) {
    this.setRatings(ratings);
  }
}
