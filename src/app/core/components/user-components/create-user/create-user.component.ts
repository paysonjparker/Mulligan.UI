import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GolfCourse } from 'src/app/core/models/golf-course/golf-course.model';
import { AddUser } from 'src/app/core/models/user/add-user.request';
import { User } from 'src/app/core/models/user/user.model';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [MessageService]
})
export class CreateUserComponent implements OnInit {

  golfCourses: GolfCourse[] | undefined;

  addUserRequest: AddUser = {
    username: "",
    password: "",
    name: "",
    email: "",
    golfCourseId: "",
  }

  // createUserForm = new FormGroup({
    // username: new FormControl(),
    // password: new FormControl(),
    // name: new FormControl(),
    // email: new FormControl(),
    // golfCourse: new FormControl()
  // });

  // createUserForm = this.fb.group({
  //   username: ['', Validators.required],
  //   password: ['', Validators.required],
  //   name: ['', Validators.required],
  //   email: ['', Validators.required],
  //   golfCourse: ['', Validators.required],
  // }); 

  createUserForm!: FormGroup;

  constructor(private golfCourseService: GolfCourseService, private userService: UserService, private router: Router, private messageService: MessageService){}

  ngOnInit(): void {   
    this.createUserForm = new FormGroup({
      username: new FormControl(this.addUserRequest.username, [Validators.required, Validators.minLength(4), Validators.maxLength(36)]),
      password: new FormControl(this.addUserRequest.password, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      name: new FormControl(this.addUserRequest.name, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      email: new FormControl(this.addUserRequest.email, [Validators.required, Validators.email]),
      golfCourse: new FormControl([Validators.required])
    });
    this.golfCourseService.getGolfCourses((golfCourses: GolfCourse[]) => this.golfCourses = golfCourses);
  }

  onSubmit(){
    let golfCourse: GolfCourse = this.createUserForm.value.golfCourse;
    this.addUserRequest.username = this.createUserForm.value.username;
    this.addUserRequest.password = this.createUserForm.value.password;
    this.addUserRequest.name = this.createUserForm.value.name;
    this.addUserRequest.email = this.createUserForm.value.email;
    this.addUserRequest.golfCourseId = golfCourse.id;

    let status = this.userService.addUser(this.addUserRequest, () => {
      console.log(status);
    });

    this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'User was successfully created!' });

    this.router.navigate(['/users'])
  }

  get username() { return this.createUserForm.get('username')!; }
  get password() { return this.createUserForm.get('password')!; }
  get name() { return this.createUserForm.get('name')!; }
  get email() { return this.createUserForm.get('email')!; }

}
