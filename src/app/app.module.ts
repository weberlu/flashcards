import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { CardboxOverviewComponent } from './components/cardbox-overview/cardbox-overview.component';
import { ChapterOverviewComponent } from './components/chapter-overview/chapter-overview.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { InquiryComponent } from './components/inquiry/inquiry.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AuthenticationTokenInterceptor } from './interceptors/auth-token.interceptor';
import { KeysPipe } from './pipes/keys.pipe';
import { AuthenticationService } from './services/authentication.service';
import { CommunicationService } from './services/communication.service';
import { DeepCopyService } from './services/deepcopy.service';
import { InquiryService } from './services/inquiry.service';
import { RestHttpService } from './services/rest.http.service';
import { SettingsService } from './services/settings.service';
import { metaReducers, reducerProvider, reducerToken } from './state/reducers/_index';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


/**
 * For NgbModule (which turns jQuery-based bootstrap components into angular components), have a look at:
 *
 *      https://ng-bootstrap.github.io
 */

@NgModule({
  declarations: [
    AppComponent,
    LoadingPageComponent,
    TodoListComponent,
    LoginComponent,
    SettingsComponent,
    ChapterOverviewComponent,
    CardboxOverviewComponent,
    InquiryComponent,
    FlashcardComponent,
    KeysPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule, // https://ng-bootstrap.github.io
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducerToken, {metaReducers}),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [reducerProvider, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationTokenInterceptor,
      multi: true
    },
    AuthenticationService,
    DeepCopyService,
    InquiryService,
    RestHttpService,
    SettingsService,
    CommunicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
