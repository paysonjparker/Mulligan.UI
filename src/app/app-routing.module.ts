import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { PostListComponent } from './core/components/post-components/post-list/post-list.component';
import { GolfCourseListComponent } from './core/components/golf-course-components/golf-course-list/golf-course-list.component';
import { UserListComponent } from './core/components/user-components/user-list/user-list.component';
import { GolfCourseMaintenanceComponent } from './core/components/golf-course-components/golf-course-maintenance/golf-course-maintenance.component';
import { CreateUserComponent } from './core/components/user-components/create-user/create-user.component';
import { PostMaintenanceComponent } from './core/components/post-components/post-maintenance/post-maintenance.component';
import { ScoreMaintenanceComponent } from './core/components/score-components/score-maintenance/score-maintenance.component';
import { ScoreListComponent } from './core/components/score-components/score-list/score-list.component';
import { UpdateUserComponent } from './core/components/user-components/update-user/update-user.component';

const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: PostListComponent
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
    component: GolfCourseMaintenanceComponent
  },
  {
    title: 'Edit Golf Course',
    path: 'golfCourses/edit/:Id',
    component: GolfCourseMaintenanceComponent
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