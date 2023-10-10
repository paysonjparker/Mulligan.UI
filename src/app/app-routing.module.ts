import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { UserProfilePageComponent } from './core/components/user-components/user-profile-page/user-profile-page.component';
import { UserListComponent } from './core/components/user-components/user-list/user-list.component';
import { CreateUserComponent } from './core/components/user-components/create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/:Id',
    component: UserProfilePageComponent
  },
  {
    path: 'createUser',
    component: CreateUserComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }