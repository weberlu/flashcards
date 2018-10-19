import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { CardboxOverviewComponent } from './components/cardbox-overview/cardbox-overview.component';
import { ChapterOverviewComponent } from './components/chapter-overview/chapter-overview.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { InquiryComponent } from './components/inquiry/inquiry';
import { LoginComponent } from './components/login/login';
import { SettingsComponent } from './components/settings/settings.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AuthenticationTokenInterceptor } from './interceptors/auth-token.interceptor';
import { KeysPipe } from './pipes/keys.pipe';
import { AuthenticationService } from './services/authentication.service';
import { DeepCopyService } from './services/deepcopy.service';
import { InquiryService } from './services/inquiry.service';
import { RestHttpService } from './services/rest.http.service';
import { SettingsService } from './services/settings.service';
import { metaReducers, reducerToken, reducerProvider } from './state/reducers/_index';

@NgModule({
  declarations: [
    AppComponent,
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
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducerToken, {metaReducers})
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
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
