import { AfterViewChecked, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
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
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    AccordionModule,
    UserListComponent,
  ],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit, AfterViewChecked, OnDestroy {

  searchUserForm!: FormGroup;

  subscriptions!: Subscription;

  users: User[] = [];

  isSearchAccoridonExpanded!: boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.isSearchAccoridonExpanded = true;
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

    this.ngZone.run(() => {
      this.subscriptions = this.userService.searchUsers(searchUserRequest).subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
    });

    this.isSearchAccoridonExpanded = false;
  }
}
