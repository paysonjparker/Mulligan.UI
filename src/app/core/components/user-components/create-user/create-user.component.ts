import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GolfCourse } from 'src/app/core/models/golf-course/golf-course.model';
import { AddUser } from 'src/app/core/models/user/add-user.request';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {

  golfCourses: GolfCourse[] | undefined;

  createUserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    golfCourse: new FormControl('')
  });

  constructor(private golfCourseService: GolfCourseService){}

  ngOnInit(): void {    
    this.golfCourseService.getGolfCourses((golfCourses: GolfCourse[]) => this.golfCourses = golfCourses);
  }
}
