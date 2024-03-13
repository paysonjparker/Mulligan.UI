import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ennvironments } from '../../environments/environments';
import { Observable } from 'rxjs';
import { GolfCourse } from '../../models/golf-course/golf-course.model';
import { UpdateGolfCourse } from '../../models/golf-course/update-golf-course.request';
import { AddGolfCourse } from '../../models/golf-course/add-golf-course.request';

@Injectable({
  providedIn: 'root'
})
export class GolfCourseService {

  readonly mulliganApiUrl = ennvironments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  public getGolfCourses(): Observable<GolfCourse[]> {
    const url = `${this.mulliganApiUrl}/GolfCourses`;

    return this.http.get<GolfCourse[]>(url);
  }

  public getGolfCourseById(id: string) {
    return this.http.get<GolfCourse>(this.mulliganApiUrl + "/GolfCourses/" + id);
  };

  public getGolfCourseByName(name: string) {
    return this.http.get<GolfCourse>(this.mulliganApiUrl + "/GolfCourses/" + name);
  };

  public deleteGolfCourse(id: string): Observable<void> {
    return this.http.delete<void>(this.mulliganApiUrl + "/GolfCourses/" + id);
  }

  public updateGolfCourse(id: string, golfCourse: UpdateGolfCourse): Observable<GolfCourse> {
    return this.http.put<GolfCourse>(this.mulliganApiUrl + "/GolfCourses/" + id, golfCourse);
  }

  public addGolfCourse(golfCourse: AddGolfCourse): Observable<GolfCourse> {
    return this.http.post<GolfCourse>(this.mulliganApiUrl + "/GolfCourses", golfCourse);
  }

  public getGolfCourseNames(callback: (golfCourseNames: string[]) => void): void {
    this.http.get<string[]>(this.mulliganApiUrl + "/GolfCourses/names").
      subscribe((golfCourseNames: string[]) => {
        callback(golfCourseNames);
      });
  }
}
