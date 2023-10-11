import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user.model';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users: User[] = [];

  selectedUser!: any;

  constructor(private router: Router, private userService: UserService){
    
  }

  ngOnInit(){
    this.userService.getAllUsers((users: User[]) => this.users = users);
    console.log(this.users);
  }

  onSelectGolfer(userId: string){
    console.log(userId);
    this.router.navigate(['/users/' + userId]);
  }

}
