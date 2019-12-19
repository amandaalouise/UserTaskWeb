import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListUserComponent } from './list/list-user/list-user.component';
import { FormUserComponent } from './form/form-user/form-user.component';
import { ListUserTasksComponent } from './list/list-usertasks/list-usertasks.component';
import { FormTaskComponent } from './form/form-task/form-task.component';


const routes: Routes = [
  {path: '', component: DashboardComponent,
  children: [
    {path: 'list-users', component: ListUserComponent },
    {path: 'add-user', component: FormUserComponent },
    {path: 'list-tasks', component: ListUserTasksComponent},
    {path: 'add-task', component: FormTaskComponent},
    {path: 'edit-user/:id', component: FormUserComponent},
    {path: 'edit-task/:id', component: FormTaskComponent},
    {path: 'user-tasks/:id', component: ListUserTasksComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
