import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Column } from 'src/app/core/models/column/column.model';
import { Score } from 'src/app/core/models/score/score.model';
import { ScoreService } from 'src/app/core/services/score/score.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-score-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    ButtonModule,
  ],
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss']
})
export class ScoreListComponent {

  @Input()
  golfCourseId!: string;

  scores: Score[] = [];

  cols!: Column[];

  columnsToDisplay!: Column[];

  get selectedColumns(): Column[] {
    return this.columnsToDisplay;
  }

  set selectedColumns(val: Column[]) {
    this.columnsToDisplay = this.cols.filter(col => val.includes(col));
  }

  subscriptions!: Subscription;

  constructor(private scoreService: ScoreService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getAllScores();
    // this.getAllScoresByUserId(this.golfCourseId);
    this.getColumns();
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

  getAllScores() {
    this.subscriptions = this.scoreService.getAllScores().subscribe({
      next: (data) => {
        this.scores = data;
        this.scores.forEach(score => {
          this.subscriptions = this.userService.getUserById(score.userId).subscribe({
            next: (data) => {
              score.userName = data.fullName;
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

  getAllScoresByUserId(golfCourseId: string) {
    this.subscriptions = this.scoreService.getAllScoresByGolfCourseId(golfCourseId).subscribe({
      next: (data) => {
        this.scores = data;
        this.scores.forEach(score => {
          this.subscriptions = this.userService.getUserById(score.userId).subscribe({
            next: (data) => {
              score.userName = data.fullName;
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

  getScoreUserName(userId: string) {
    this.subscriptions = this.userService.getUserById(userId).subscribe({
      next: (data) => {
        return data.fullName;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getColumns() {
    this.cols = [
      { header: 'User', field: 'userName', hide: false },
      { header: 'Total', field: 'total', hide: false },
      { header: 'Differential', field: 'differential', hide: false },
    ];

    this.columnsToDisplay = this.cols.filter(col => !col.hide);
  }
}
