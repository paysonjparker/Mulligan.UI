import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { User } from 'src/app/core/models/user/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { Column } from 'src/app/core/models/column/column.model';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    CardModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  cols!: Column[];

  columnsToDisplay!: Column[];

  get selectedColumns(): Column[] {
    return this.columnsToDisplay;
  }

  set selectedColumns(val: Column[]) {
    this.columnsToDisplay = this.cols.filter(col => val.includes(col));
  }


  constructor(private userService: UserService, private cdrf: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAllUsers();
    this.getColumns();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.cdrf.markForCheck();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getColumns() {
    this.cols = [
      { header: 'Id', field: 'id', hide: true },
      { header: 'Username', field: 'username', hide: false },
      { header: 'Name', field: 'name', hide: false },
      { header: 'Email', field: 'email', hide: true },
      { header: 'Handicap Index', field: 'handicapIndex', hide: false },
      { header: 'Home Golf Course', field: 'homeCourseName', hide: false },
    ];

    this.columnsToDisplay = this.cols.filter(col => !col.hide);
  }
}
