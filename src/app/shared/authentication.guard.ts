import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { LocalService } from '../services/local/local.service';
import { jwtDecode } from 'jwt-decode';
import { JwtService } from '../services/jwt/jwt.service';
import { of, tap } from 'rxjs';


export const authenticationGuard: CanActivateFn = (route, state) => {
  // injection du service d'authentification
  const localService = inject(LocalService);
  const jwtService = inject(JwtService);
  return jwtService.isValid();
};
