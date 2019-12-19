import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './list/list-user/list-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormUserComponent } from './form/form-user/form-user.component';
import { FormTaskComponent } from './form/form-task/form-task.component';
import { BasicAuthInterceptor } from './utils/basic-auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListUserTasksComponent } from './list/list-usertasks/list-usertasks.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    ListUserTasksComponent,
    DashboardComponent,
    FormUserComponent,
    FormTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
