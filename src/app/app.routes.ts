import { Routes } from '@angular/router';
import { CardboxOverviewComponent } from './components/cardbox-overview/cardbox-overview.component';
import { ChapterOverviewComponent } from './components/chapter-overview/chapter-overview.component';
import { InquiryComponent } from './components/inquiry/inquiry.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/chapter-overview',
    pathMatch: 'full'
  },
  {
    path: 'todo-list',
    component: TodoListComponent
  },
  {
    path: 'chapter-overview',
    component: ChapterOverviewComponent
  },
  {
    path: 'cardbox-overview',
    component: CardboxOverviewComponent
  },
  {
    path: 'inquiry',
    component: InquiryComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
