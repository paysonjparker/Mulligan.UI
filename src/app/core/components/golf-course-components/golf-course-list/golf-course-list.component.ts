import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GolfCourse } from 'src/app/core/models/golf-course/golf-course.model';
import { Column } from 'src/app/core/models/column/column.model';
import { Subscription } from 'rxjs';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-golf-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    CardModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './golf-course-list.component.html',
  styleUrls: ['./golf-course-list.component.scss']
})
export class GolfCourseListComponent implements OnInit, OnDestroy {

  golfCourses: GolfCourse[] = [];

  cols!: Column[];

  columnsToDisplay!: Column[];

  get selectedColumns(): Column[] {
    return this.columnsToDisplay;
  }

  set selectedColumns(val: Column[]) {
    this.columnsToDisplay = this.cols.filter(col => val.includes(col));
  }

  subscriptions!: Subscription;

  constructor(
    private golfCourseService: GolfCourseService,
    private cdrf: ChangeDetectorRef,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.getAllGolfCourses();
    this.getColumns();
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

  getAllGolfCourses() {
    this.ngZone.run(() => {
      this.subscriptions = this.golfCourseService.getGolfCourses().subscribe({
        next: (data) => {
          this.golfCourses = data;
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
      { header: 'Name', field: 'name', hide: false },
      { header: 'Location', field: 'location', hide: false },
      { header: 'Par', field: 'par', hide: false },
      { header: 'Yardage', field: 'yardage', hide: false },
      { header: 'Slope Rating', field: 'slopeRating', hide: false },
      { header: 'Course Rating', field: 'courseRating', hide: false },
    ];

    this.columnsToDisplay = this.cols.filter(col => !col.hide);
  }

}
