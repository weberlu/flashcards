import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Tutorial:   https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
 */
@Injectable()
export class CommunicationService {
  private subject: Subject<string> = new Subject<string>();

  private infoChannel: Subject<BackendMessage> = new Subject();

  constructor() {
    // nothing to do here.
  }

  /*
   * See also this tutorial how parent <--> child components can communicate:
   *
   *    https://angular.io/guide/component-interaction#parent-listens-for-child-event
   */

  public info(message: BackendMessage) {
    this.infoChannel.next(message);
  }

  public say(message: string) {
    this.subject.next(message);
  }

  public hear(): Observable<string> {
    return this.subject.asObservable();
  }
}
