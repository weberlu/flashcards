import * as moment from 'moment';

export const SESSION_EXPIRES_AFTER_MINUTES = 30;

export class Session {
  user: string;
  token: string;
  expires: Date;

  constructor(user: string = '', token: string = '') {
    this.user = user;
    this.token = token;
    this.updateExpiration();
  }

  public hasExpired(): boolean {
    const then = moment(this.expires);
    const now = moment(new Date());
    return moment.duration(now.diff(then)).asMinutes() > SESSION_EXPIRES_AFTER_MINUTES;
  }

  public updateExpiration(): void {
    if (this.token) {
      this.expires = new Date();
    }
  }

  public hasToken(): boolean {
    return !!this.token;
  }

  public getToken(): string {
    return this.token || '';
  }

  public setToken(token: string): void {
    this.token = token;
  }
}
