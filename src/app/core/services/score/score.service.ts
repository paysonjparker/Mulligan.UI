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

  readonly mulliganApiUrl = environments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  public getAllScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.mulliganApiUrl + "/scores");
  };

  public getAllScoresByUserId(userId: string): Observable<Score[]> {
    return this.http.get<Score[]>(this.mulliganApiUrl + "/scores/user/" + userId);
  };

  public getAllScoresByGolfCourseId(golfCourseId: string): Observable<Score[]> {
    return this.http.get<Score[]>(this.mulliganApiUrl + "/scores/golfCourse/" + golfCourseId);
  };

  public deleteScore(scoreId: string): Observable<void> {
    return this.http.delete<void>(this.mulliganApiUrl + "/scores/" + scoreId);
  }

  public createScore(scoreCreationRequest: ScoreCreationRequest): Observable<Score> {
    return this.http.post<Score>(this.mulliganApiUrl + "/scores", scoreCreationRequest);
  }
}
