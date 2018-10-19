import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import { Session } from '../models/session.model';
import { AddToken, RemoveToken } from '../state/actions/auth.action';
import { StoreKey } from '../state/store.config';
import { RestEndpoints, RestHttpService } from './rest.http.service';


@Injectable()
export class AuthenticationService {
  private session: Session;

  constructor(private store: Store<AppState>, private restService: RestHttpService) {
    this.store.select(StoreKey).subscribe((state => this.session = state.session));
  }

  public login(identifier: string, password: string) {
    return this.restService.doPost(RestEndpoints.AUTHENTICATION, {identifier, password})
      .pipe(map(response => {
        // login is considered to be successful if there's a jwt token in the response
        if (response && response.token) {
          this.store.dispatch(new AddToken(new Session(identifier, response.token)));
        }

        return response;
      }));
  }

  public logout() {
    this.store.dispatch(new RemoveToken());
  }

  public getSessionToken(): string {
    return this.session.getToken();
  }

  public isAuthenticated(): boolean {
    return this.session.hasToken() && !this.session.hasExpired();
  }
}
