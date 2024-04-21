import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../services/local/local.service';
import { JwtService } from '../services/jwt/jwt.service';
import { tap } from 'rxjs';


export const authenticationGuard: CanActivateFn = (route, state) => {
  // injection du service d'authentification
  const router = inject(Router);
  const jwtService = inject(JwtService);
  return jwtService.isValid().pipe((tap(response => {
    if (!response) {
      router.navigate(['/login']);
    }
  })));
};
