import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GolfCourse } from 'src/app/core/models/golf-course/golf-course.model';
import { Column } from 'src/app/core/models/column/column.model';
import { Subscription } from 'rxjs';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

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
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './golf-course-list.component.html',
  styleUrls: ['./golf-course-list.component.scss'],
  providers: [ConfirmationService, MessageService]
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
    private ngZone: NgZone,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
      this.subscriptions = this.golfCourseService.getAllGolfCourses().subscribe({
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

  confirmDeleteDialog(golfCourseId: string, golfCourseName: string) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${golfCourseName}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteGolfCourse(golfCourseId);
        this.golfCourses = this.golfCourses.filter(golfCourse => golfCourse.id != golfCourseId);
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: `${golfCourseName} was deleted successfully.` });
      },
      reject: () => {

      }
    });
  }

  deleteGolfCourse(golfCourseId: string) {
    this.subscriptions = this.golfCourseService.deleteGolfCourse(golfCourseId).subscribe({
      next: () => {
        console.info("Deleted golf course ID: ", golfCourseId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

}
