import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

@Injectable()
export class CheckingInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = 'YOUR_AUTH_TOKEN_HERE';

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    return next.handle(authReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.error('Unauthorized request:', err);
            // Handle unauthorized access
            // For example, navigate to the login page
            this.router.navigate(['/unauthorized']);
          } else if (err.status === 403) {
            console.error('Forbidden:', err);
            // Handle forbidden access
            // For example, navigate to the access denied page
            this.router.navigate(['/forbidden']);
          } else if (err.status === 500) {
            console.error('Internal server error:', err);
            // Handle internal server error
            // For example, navigate to an error page
            this.router.navigate(['/internal-server']);
          }
        } else {
          console.error('An error occurred:', err);
        }
        return throwError(err);
      })
    );
  }
}