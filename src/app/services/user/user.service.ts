import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { ArgsUserTypes } from '../../shared/types';
import { LocalService } from '../local/local.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: BehaviorSubject<User | undefined> | undefined;

  constructor(
    private authService: AuthService,
    private localService: LocalService
  ) {
    this.loadCurrentUser();
    this.currentUser = new BehaviorSubject<User | undefined>(undefined);
  }

  public loadCurrentUser(): void {
    if (!this.currentUser) {
      this.authService.me().subscribe({
        next: (response: any) => {
          this.setCurrentUser(response.data)
        },
      })
    }
  }

  public getCurrentUser(): BehaviorSubject<User | undefined> | undefined {
    return this.currentUser;
  }

  public setCurrentUser(args: ArgsUserTypes): void {
    this.currentUser?.next(new User(args));
  }

  public logout(): Observable<boolean> {
    return of(null).pipe((switchMap(() => {
      console.log("LOGOUT CONTENT");

      this.getCurrentUser()?.next(undefined);
      this.localService.clearData();
      return of(true);
    })));
  }
}
