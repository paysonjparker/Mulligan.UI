import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GolfCourse } from 'src/app/core/models/golf-course/golf-course.model';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { User } from 'src/app/core/models/user/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { Column } from 'src/app/core/models/column/column.model';
import { AccordionModule } from 'primeng/accordion';
import { Score } from 'src/app/core/models/score/score.model';
import { ScoreService } from 'src/app/core/services/score/score.service';
import { ScoreListComponent } from '../../score-components/score-list/score-list.component';

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
    RouterLink,
    AccordionModule,
    ScoreListComponent
  ],
  templateUrl: './golf-course-details.component.html',
  styleUrls: ['./golf-course-details.component.scss']
})
export class GolfCourseDetailsComponent implements OnInit, OnDestroy {

  golfCourse: GolfCourse = {
    id: '',
    name: '',
    city: '',
    country: '',
    slopeRating: 0,
    courseRating: 0,
    yardage: 0,
    par: 0,
    scores: [],
    posts: []
  };

  members: User[] = [];

  scores: Score[] = [];

  cols!: Column[];

  columnsToDisplay!: Column[];

  subscriptions!: Subscription;

  get selectedColumns(): Column[] {
    return this.columnsToDisplay;
  }

  set selectedColumns(val: Column[]) {
    this.columnsToDisplay = this.cols.filter(col => val.includes(col));
  }

  constructor(private golfCourseService: GolfCourseService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private scoreService: ScoreService) { }

  ngOnInit() {
    this.getGolfCourseData();
    this.getColumns();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getGolfCourseData() {
    this.subscriptions = this.golfCourseService.getGolfCourseById(this.activatedRoute.snapshot.paramMap.get("Id")!).subscribe({
      next: (data) => {
        this.golfCourse = data;
        this.getGolfCourseMembers(data.id);
        this.getGolfCourseScores(data.id);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getGolfCourseMembers(golfCourseId: string) {
    this.subscriptions = this.userService.getAllUsersByGolfCourseId(golfCourseId).subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getGolfCourseScores(golfCourseId: string) {
    this.subscriptions = this.scoreService.getAllScoresByGolfCourseId(golfCourseId).subscribe({
      next: (data) => {
        this.scores = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getColumns() {
    this.cols = [
      { header: 'Name', field: 'fullName', hide: false },
      { header: 'Username', field: 'username', hide: false },
      { header: 'Email', field: 'emailAddress', hide: false },
      { header: 'Handicap Index', field: 'handicapIndex', hide: false },
    ];

    this.columnsToDisplay = this.cols.filter(col => !col.hide);
  }

  onEditClick() {
    this.router.navigate(['golfCourses/edit/', this.golfCourse.id]);
  }

}
