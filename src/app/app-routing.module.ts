import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { PostListComponent } from './core/components/post-components/post-list/post-list.component';
import { GolfCourseListComponent } from './core/components/golf-course-components/golf-course-list/golf-course-list.component';
import { UserListComponent } from './core/components/user-components/user-list/user-list.component';
import { CreateGolfCourseComponent } from './core/components/golf-course-components/create-golf-course/create-golf-course.component';
import { CreateUserComponent } from './core/components/user-components/create-user/create-user.component';
import { ScoreMaintenanceComponent } from './core/components/score-components/score-maintenance/score-maintenance.component';
import { ScoreListComponent } from './core/components/score-components/score-list/score-list.component';
import { UpdateUserComponent } from './core/components/user-components/update-user/update-user.component';
import { UserDetailsComponent } from './core/components/user-components/user-details/user-details.component';
import { EditGolfCourseComponent } from './core/components/golf-course-components/edit-golf-course/edit-golf-course.component';
import { GolfCourseDetailsComponent } from './core/components/golf-course-components/golf-course-details/golf-course-details.component';
import { HomeComponent } from './core/components/home/home/home.component';
import { CreatePostComponent } from './core/components/post-components/create-post/create-post.component';
import { UserSearchComponent } from './core/components/user-components/user-search/user-search.component';
import { DiscoverComponent } from './core/components/discover/discover/discover.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'Add Post',
    path: 'posts/create/:Id',
    component: CreatePostComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'Golf Courses',
    path: 'golfCourses',
    component: GolfCourseListComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'Create Golf Course',
    path: 'golfCourses/create',
    component: CreateGolfCourseComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'Edit Golf Course',
    path: 'golfCourses/edit/:Id',
    component: EditGolfCourseComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'View Golf Course',
    path: 'golfCourses/:Id',
    component: GolfCourseDetailsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'Users',
    path: 'users',
    component: UserSearchComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'Register',
    path: 'register',
    component: CreateUserComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'View User',
    path: 'users/:Id',
    component: UserDetailsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'Edit User',
    path: 'users/edit/:Id',
    component: UpdateUserComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'View Scores',
    path: 'scores',
    component: ScoreListComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'Add Score',
    path: 'scores/create',
    component: ScoreMaintenanceComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    title: 'Discover',
    path: 'discover/:search',
    component: DiscoverComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }