import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable } from 'rxjs';
import { GolfCourse } from '../../models/golf-course/golf-course.model';
import { GolfCourseUpdateRequest } from '../../models/golf-course/golf-course-update.request';
import { GolfCourseCreationRequest } from '../../models/golf-course/golf-course-create.request';

@Injectable({
  providedIn: 'root'
})
export class GolfCourseService {

  readonly mulliganApiUrl = environments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  public getAllGolfCourses(): Observable<GolfCourse[]> {
    const url = `${this.mulliganApiUrl}/GolfCourse`;

    return this.http.get<GolfCourse[]>(url);
  }

  public getGolfCourseById(golfCourseId: string): Observable<GolfCourse> {
    return this.http.get<GolfCourse>(this.mulliganApiUrl + "/GolfCourse/" + golfCourseId);
  };

  public deleteGolfCourse(golfCourseId: string): Observable<void> {
    return this.http.delete<void>(this.mulliganApiUrl + "/GolfCourse/" + golfCourseId);
  }

  public updateGolfCourse(golfCourseId: string, golfCourseUpdateRequest: GolfCourseUpdateRequest): Observable<GolfCourse> {
    return this.http.put<GolfCourse>(this.mulliganApiUrl + "/GolfCourse/" + golfCourseId, golfCourseUpdateRequest);
  }

  public createGolfCourse(golfCourseCreationRequest: GolfCourseCreationRequest): Observable<GolfCourse> {
    return this.http.post<GolfCourse>(this.mulliganApiUrl + "/GolfCourse", golfCourseCreationRequest);
  }
}
