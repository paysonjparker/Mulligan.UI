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
      searchQuery: new FormControl<string>(''),
    });
  }

  onSearchClick() {
    const searchQuery = this.searchUserForm.get('searchQuery')?.value ?? null;

    this.ngZone.run(() => {
      this.subscriptions = this.userService.searchUsers(searchQuery).subscribe({
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
