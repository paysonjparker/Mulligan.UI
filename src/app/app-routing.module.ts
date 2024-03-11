import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { PostListComponent } from './core/components/post-components/post-list/post-list.component';
import { GolfCourseListComponent } from './core/components/golf-course-components/golf-course-list/golf-course-list.component';
import { UserListComponent } from './core/components/user-components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'golfCourses',
    component: GolfCourseListComponent
  },
  {
    path: 'users',
    component: UserListComponent
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