import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GolfCourse } from 'src/app/core/models/golf-course/golf-course.model';
import { User } from 'src/app/core/models/user/user.model';
import { GolfCourseService } from 'src/app/core/services/golf-course/golf-course.service';

@Component({
  selector: 'app-golf-course-list',
  templateUrl: './golf-course-list.component.html',
  styleUrls: ['./golf-course-list.component.css']
})
export class GolfCourseListComponent {

  golfCourses: GolfCourse[] = [];

  selectedGolfCourse!: any;

  constructor(private router: Router, private golfCourseService: GolfCourseService){
    
  }

  ngOnInit(){
    this.golfCourseService.getGolfCourses((golfCourses: GolfCourse[]) => this.golfCourses = golfCourses);
    console.log(this.golfCourses);
  }

  onSelectGolfCourse(golfCourseId: string){
    console.log(golfCourseId);
    this.router.navigate(['/golfCourses/' + golfCourseId]);
  }
}
