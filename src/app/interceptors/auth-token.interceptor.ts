import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UpdateToken } from '../state/actions/auth.action';
import { AppState } from '../state/app.state';

@Injectable()
export class AuthenticationTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>,
              private authService: AuthenticationService) { }

  /*
   * Tutorials about angular HttpInceptors ::
   *    - https://jaxenter.de/angular-http-interceptoren-63488
   *    - http://jasonwatmore.com/post/2018/05/23/angular-6-jwt-authentication-example-tutorial
   *    - https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.authService.isAuthenticated()) {
      // don't forget to clone the request because HttpHeaders are immutable.
      request = request.clone({
        headers: request.headers
          .set('X-auth-token', this.authService.getSessionToken())
          .set('Content-Type', 'application/json; charset=utf-8')
      });
    }

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log('Yieha, authentication request passed!');
        this.store.dispatch(new UpdateToken());
      }
    } /* }, (error: HttpErrorResponse) => {...} */));
  }
}
