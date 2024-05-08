import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Score } from '../../models/score/score.model';
import { ScoreCreationRequest } from '../../models/score/score-creation.request';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  // test
  readonly mulliganApiUrl = environments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  public getAllScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.mulliganApiUrl + "/Score");
  };

  public getAllScoresByUserId(userId: string): Observable<Score[]> {
    return this.http.get<Score[]>(this.mulliganApiUrl + "/Score/user/" + userId);
  };

  public getAllScoresByGolfCourseId(golfCourseId: string): Observable<Score[]> {
    return this.http.get<Score[]>(this.mulliganApiUrl + "/Score/golfCourse/" + golfCourseId);
  };

  public deleteScore(scoreId: string): Observable<void> {
    return this.http.delete<void>(this.mulliganApiUrl + "/Score/" + scoreId);
  }

  public createScore(scoreCreationRequest: ScoreCreationRequest): Observable<Score> {
    return this.http.post<Score>(this.mulliganApiUrl + "/Score", scoreCreationRequest);
  }
}
