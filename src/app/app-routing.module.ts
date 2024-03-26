import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { PostListComponent } from './core/components/post-components/post-list/post-list.component';
import { GolfCourseListComponent } from './core/components/golf-course-components/golf-course-list/golf-course-list.component';
import { UserListComponent } from './core/components/user-components/user-list/user-list.component';
import { CreateGolfCourseComponent } from './core/components/golf-course-components/create-golf-course/create-golf-course.component';
import { CreateUserComponent } from './core/components/user-components/create-user/create-user.component';
import { PostMaintenanceComponent } from './core/components/post-components/post-maintenance/post-maintenance.component';
import { ScoreMaintenanceComponent } from './core/components/score-components/score-maintenance/score-maintenance.component';
import { ScoreListComponent } from './core/components/score-components/score-list/score-list.component';
import { UpdateUserComponent } from './core/components/user-components/update-user/update-user.component';
import { UserDetailsComponent } from './core/components/user-components/user-details/user-details.component';
import { EditGolfCourseComponent } from './core/components/golf-course-components/edit-golf-course/edit-golf-course.component';
import { GolfCourseDetailsComponent } from './core/components/golf-course-components/golf-course-details/golf-course-details.component';
import { HomeComponent } from './core/components/home/home/home.component';

const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: HomeComponent
  },
  {
    title: 'Add Post',
    path: 'posts/create',
    component: PostMaintenanceComponent
  },
  {
    title: 'Edit Post',
    path: 'posts/edit/:Id',
    component: PostMaintenanceComponent
  },
  {
    title: 'Golf Courses',
    path: 'golfCourses',
    component: GolfCourseListComponent
  },
  {
    title: 'Create Golf Course',
    path: 'golfCourses/create',
    component: CreateGolfCourseComponent
  },
  {
    title: 'Edit Golf Course',
    path: 'golfCourses/edit/:Id',
    component: EditGolfCourseComponent
  },
  {
    title: 'View Golf Course',
    path: 'golfCourses/:Id',
    component: GolfCourseDetailsComponent
  },
  {
    title: 'Users',
    path: 'users',
    component: UserListComponent
  },
  {
    title: 'Create User',
    path: 'users/create',
    component: CreateUserComponent
  },
  {
    title: 'View User',
    path: 'users/:Id',
    component: UserDetailsComponent
  },
  {
    title: 'Edit User',
    path: 'users/edit/:Id',
    component: UpdateUserComponent
  },
  {
    title: 'View Scores',
    path: 'scores',
    component: ScoreListComponent
  },
  {
    title: 'Add Score',
    path: 'scores/create',
    component: ScoreMaintenanceComponent
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