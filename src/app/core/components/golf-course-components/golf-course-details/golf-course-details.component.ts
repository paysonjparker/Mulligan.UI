import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GolfCourse } from 'src/app/core/models/golf-course/golf-course.model';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ScoreService } from 'src/app/core/services/score/score.service';
import { User } from 'src/app/core/models/user/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { Column } from 'src/app/core/models/column/column.model';

@Component({
  selector: 'app-golf-course-details',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    MultiSelectModule,
    RouterLink
  ],
  templateUrl: './golf-course-details.component.html',
  styleUrls: ['./golf-course-details.component.scss']
})
export class GolfCourseDetailsComponent implements OnInit, OnDestroy {

  golfCourse!: GolfCourse;

  members: User[] = [];

  cols!: Column[];

  columnsToDisplay!: Column[];

  subscriptions!: Subscription;

  get selectedColumns(): Column[] {
    return this.columnsToDisplay;
  }

  set selectedColumns(val: Column[]) {
    this.columnsToDisplay = this.cols.filter(col => val.includes(col));
  }

  constructor(private golfCourseService: GolfCourseService, private userService: UserService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.getGolfCourseData();
    this.getGolfCourseMembers();
    this.getColumns();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getGolfCourseData() {
    this.subscriptions = this.golfCourseService.getGolfCourseById(this.activatedRoute.snapshot.paramMap.get("Id")!).subscribe({
      next: (data) => {
        this.golfCourse = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getGolfCourseMembers() {
    this.subscriptions = this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.members = data.filter(user => {
          return user.golfCourseId === this.golfCourse.id
        });
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getColumns() {
    this.cols = [
      { header: 'Name', field: 'name', hide: false },
      { header: 'Username', field: 'username', hide: false },
      { header: 'Email', field: 'email', hide: false },
      { header: 'Handicap Index', field: 'handicapIndex', hide: false },
    ];

    this.columnsToDisplay = this.cols.filter(col => !col.hide);
  }

}
