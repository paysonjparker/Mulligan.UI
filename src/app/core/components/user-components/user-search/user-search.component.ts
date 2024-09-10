import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from '../user-list/user-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { User } from 'src/app/core/models/user/user.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserSearchRequest } from 'src/app/core/models/user/user-search.request';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    UserListComponent,
  ],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit, AfterViewChecked, OnDestroy {

  searchUserForm!: FormGroup;

  subscriptions!: Subscription;

  users: User[] = [];

  hasExecutedSearch: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    this.searchUserForm = this.createSearchUserForm();
  }

  ngAfterViewChecked(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  createSearchUserForm(): FormGroup {
    return this.formBuilder.group({
      username: new FormControl<string>(''),
      fullName: new FormControl<string>(''),
      emailAddress: new FormControl<string>(''),
      homeCourseName: new FormControl<string>(''),
    });
  }

  onSearchClick() {
    const searchUserRequest: UserSearchRequest = {
      username: this.searchUserForm.get('username')?.value ?? null,
      fullName: this.searchUserForm.get('fullName')?.value ?? null,
      emailAddress: this.searchUserForm.get('emailAddress')?.value ?? null,
      homeCourseName: this.searchUserForm.get('homeCourseName')?.value ?? null,
    }

    console.info(searchUserRequest);

    this.subscriptions = this.userService.searchUsers(searchUserRequest).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error(error);
      }
    });


  }
}
