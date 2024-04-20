import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { LocalService } from '../services/local/local.service';
import { jwtDecode } from 'jwt-decode';


export const authenticationGuard: CanActivateFn = (route, state) => {
  // injection du service d'authentification
  const localService = inject(LocalService);
  const accessToken = localService.getData("accessToken");
  console.log("Access Token ", accessToken);
  const tokenDecoded = jwtDecode(accessToken!);
  if (tokenDecoded) {
    return true;
  }


  // try {
  //   if (accessToken) {
  //     const resultChecked = jwt.verify(accessToken, tokenKey);
  //     console.log("resultChecked ", resultChecked);
  //   }
  // } catch (error) {
  //   console.log("error ", error);
  // }

  return false;
};
