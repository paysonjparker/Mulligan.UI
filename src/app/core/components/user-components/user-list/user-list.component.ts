import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { User } from 'src/app/core/models/user/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Column } from 'src/app/core/models/column/column.model';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    CardModule,
    ButtonModule,
    RouterLink,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[] = [];

  cols!: Column[];

  columnsToDisplay!: Column[];

  get selectedColumns(): Column[] {
    return this.columnsToDisplay;
  }

  set selectedColumns(val: Column[]) {
    this.columnsToDisplay = this.cols.filter(col => val.includes(col));
  }

  subscriptions!: Subscription;

  constructor(private userService: UserService,
    private cdrf: ChangeDetectorRef,
    private router: Router,
    private ngZone: NgZone,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
    this.getColumns();
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

  getAllUsers() {
    this.ngZone.run(() => {
      this.subscriptions = this.userService.getAllUsers().subscribe({
        next: (data) => {
          this.users = data;
          this.cdrf.markForCheck();
        },
        error: (error) => {
          console.error(error);
        }
      });
    });
  }

  getColumns() {
    this.cols = [
      { header: 'Username', field: 'username', hide: false },
      { header: 'Name', field: 'name', hide: false },
      { header: 'Email', field: 'email', hide: true },
      { header: 'Handicap Index', field: 'handicapIndex', hide: false },
      { header: 'Home Golf Course', field: 'homeCourseName', hide: false },
    ];

    this.columnsToDisplay = this.cols.filter(col => !col.hide);
  }

  confirmDeleteDialog(userId: string, userName: string) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${userName}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(userId);
        this.users = this.users.filter(user => user.id != userId);
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: `${userName} was deleted successfully.` });
      },
      reject: () => {

      }
    });
  }

  deleteUser(userId: string) {
    this.subscriptions = this.userService.deleteUser(userId).subscribe({
      next: () => {
        console.info("Deleted user ID: ", userId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
