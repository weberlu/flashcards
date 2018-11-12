import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable()
export class RestHttpService {
  private loading: boolean;

  constructor(private http: HttpClient, private router: Router) {
    // nothing to do here.
  }

  /**
   * Indicator whether at least one request is going on.
   */
  public get isLoading(): boolean {
    return this.loading;
  }


  /**
   * Send a GET request to the given endpoint with the given parameters.
   *
   * @param endpoint endpoint to address
   * @param params query parameters to deliver
   */
  public doGet(endpoint: string, params: Object = {}): Observable<any> {
    return this.doRequest('GET', endpoint, { params: this.generateHttpParams(params) });
  }

  /**
   * Send a POST request to the given endpoint with the given body data.
   *
   * @param endpoint endpoint to address
   * @param data request body data to deliver
   * @param params query parameters to deliver
   */
  public doPost(endpoint: string, data: any = null, params: Object = {}): Observable<any> {
    return this.doRequest('POST', endpoint, { body: data, params: this.generateHttpParams(params) });
  }

  /**
   * Send a PUT request to the given endpoint with the given body data.
   *
   * @param endpoint endpoint to address
   * @param data request body data to deliver
   * @param params query parameters to deliver
   */
  public doPut(endpoint: string, data: any = null, params: Object = {}): Observable<any> {
    return this.doRequest('PUT', endpoint, { body: data, params: this.generateHttpParams(params) });
  }


  /**
   * Send a DELETE request to the given endpoint with the given parameters.
   *
   * @param endpoint endpoint to address
   * @param params query parameters to deliver
   */
  public doDelete(endpoint: string, params: Object = {}): Observable<any> {
    return this.doRequest('DELETE', endpoint, { params: this.generateHttpParams(params) });
  }


  /**
   * Generate a HttpParams object and fill in the key-value pairs from given parameter object.
   *
   * @param params query parameters to deliver
   */
  private generateHttpParams(params: Object = {}): HttpParams {
    const httpParams: HttpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams.set(key, params[key]);
    });
    return httpParams;
  }


  /**
   * Method to send a request, where the request method is defined by the parameter.
   *
   * @param method one of the following: get, put, post, delete.
   * @param endpoint specific rest endpoint to invoke.
   * @param options additional options that are delivered to http: request call
   */
  private doRequest(method: string, endpoint: string, options: Object = {}): Observable<any> {
    this.loading = true;

    const url = [environment.apiUrl, endpoint].join('');
    const requestObservable: Observable<any> = this.http.request<any>(method, url, options);

    requestObservable.subscribe((response: HttpResponse<any>) => {
      this.handleSuccess(response);
    }, (error: HttpErrorResponse) => {
      this.handleError(error);
    }, () => {
      this.loading = false;
    });

    // return the request's Observable so that callers can subscribe
    return requestObservable;
  }


  /**
   * Handler for successfully resolved requests.
   *
   * @param response success response
   */
  private handleSuccess(response: HttpResponse<any>): void {
    console.log('request succeeded: ', response);
  }


  /**
   * Handler for failed requests.
   * @param error error response
   */
  private handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(`An error occurred: ${error.status} - ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    this.navigate(error.status);
  }


  /**
   * Depending on the error status, navigate to the correct page.
   * @param errorStatus http status of error case
   */
  private navigate(errorStatus: number) {
    let targetPage: string;
    switch (errorStatus) {
      case 401: // Unauthorized
        targetPage = 'login';
        break;
      default:
        targetPage = 'error'; // default page in case of an unspecific error
    }
    this.router.navigate([targetPage]);
  }
}
