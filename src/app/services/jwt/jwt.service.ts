import { Injectable } from '@angular/core';
import { LocalService } from '../local/local.service';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private token: string | undefined | null;

  constructor(private localService: LocalService) {
    this.token = this.localService.getData("accessToken");
  }

  public isValid(): Observable<boolean> {
    try {
      const tokenDecoded = jwtDecode(this.token!);
      if (tokenDecoded) {
        return of(true);
      }
      return of(false);
    } catch (error: any) {
      return of(false);
    }
  }
}
