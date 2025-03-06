import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>({id: ""} as User);
  user$ = this.userSubject.asObservable();

  userDb?: string | null;
  jwtDb?: string | null;
  constructor() { 
    const user = this.userSubject.getValue();
    this.userDb = localStorage.getItem('user');
    this.jwtDb = localStorage.getItem('jwt');
    if (this.userDb) {
      this.userSubject.next(JSON.parse(this.userDb))      
    } else {
      localStorage.setItem('jwt', JSON.stringify(user.jwt || ''));
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  setUser(user: User) {
    this.userSubject.next(user)
    localStorage.setItem('jwt', JSON.stringify(user.jwt || ''));
    localStorage.setItem('user', JSON.stringify(user))
  }
  updateUser(user: User) {
    this.setUser(user)
    localStorage.setItem('users', JSON.stringify(user))
  }
}
