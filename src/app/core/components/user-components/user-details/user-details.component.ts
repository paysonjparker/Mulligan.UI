import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { User } from 'src/app/core/models/user/user.model';
import { Score } from 'src/app/core/models/score/score.model';
import { Column } from 'src/app/core/models/column/column.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { ScoreService } from 'src/app/core/services/score/score.service';
import { AccordionModule } from 'primeng/accordion';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';
import { PostListComponent } from '../../post-components/post-list/post-list.component';

@Component({
  selector: 'app-user-details',
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
    PostListComponent
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  user!: User;

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

  constructor(private userService: UserService,
    private scoreService: ScoreService,
    private golfCourseService: GolfCourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getUserData();
    this.getUserScores();
    this.getColumns();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getUserData() {
    this.subscriptions = this.userService.getUserById(this.activatedRoute.snapshot.paramMap.get("Id")!).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getUserScores() {
    this.subscriptions = this.scoreService.getScoresByUserId(this.activatedRoute.snapshot.paramMap.get("Id")!).subscribe({
      next: (data) => {
        this.scores = data;
        this.scores.forEach(score => {
          this.subscriptions = this.golfCourseService.getGolfCourseById(score.golfCourseId).subscribe({
            next: (data) => {
              score.golfCourseName = data.name;
            },
            error: (error) => {
              console.error(error);
            }
          });
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getColumns() {
    this.cols = [
      { header: 'Golf Course', field: 'golfCourseName', hide: false },
      { header: 'Total', field: 'total', hide: false },
      { header: 'Differential', field: 'differential', hide: false },
    ];

    this.columnsToDisplay = this.cols.filter(col => !col.hide);
  }

  onEditClick() {
    this.router.navigate(['users/edit/', this.user.id]);
  }

}
