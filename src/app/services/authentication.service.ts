import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestEndpoints } from '../enums/rest.endpoints.enum';
import { AppState } from '../state/app.state';
import { Session } from '../models/session.model';
import { AddToken, RemoveToken } from '../state/actions/auth.action';
import { StoreKey } from '../state/store.config';
import { RestHttpService } from './rest.http.service';


@Injectable()
export class AuthenticationService {
  private session: Session;

  constructor(private store: Store<AppState>, private restService: RestHttpService) {
    this.store.select(StoreKey).subscribe((state => this.session = new Session(state.session.user, state.session.token)));
  }

  public login(username: string, password: string): Observable<HttpResponse<any>> {
    return this.restService.doPost(RestEndpoints.AUTHENTICATION, { username: username, password: password })
      .pipe(map(response => {
        // login is considered to be successful if there's a jwt token in the response
        if (response && response.token) {
          this.store.dispatch(new AddToken(new Session(username, response.token)));
        }

        return response;
      }));
  }

  public logout() {
    this.store.dispatch(new RemoveToken());
  }

  public getSessionToken(): string {
    return this.session.token;
  }

  public isAuthenticated(): boolean {
    return !!this.getSessionToken() && !this.session.hasExpired();
  }
}
