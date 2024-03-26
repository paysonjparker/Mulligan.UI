import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ennvironments } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Score } from '../../models/score/score.model';
import { AddScore } from '../../models/score/add-score.request';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  readonly mulliganApiUrl = ennvironments.mulliganLocalApi;

  constructor(private http: HttpClient) { }

  public getAllScores(callback: (scores: Score[]) => void): void {
    this.http.get<Score[]>(this.mulliganApiUrl + "/Scores").
      subscribe((scores: Score[]) => {
        callback(scores);
      });
  }

  public getScoresByUserId(id: string): Observable<Score[]> {
    return this.http.get<Score[]>(this.mulliganApiUrl + "/Scores/" + id);
  };

  public deleteScore(id: string): Observable<void> {
    return this.http.delete<void>(this.mulliganApiUrl + "/Scores/" + id);
  }

  public addScore(score: AddScore, callback: () => void): void {
    this.http.post<Score>(this.mulliganApiUrl + "/Scores", score).
      subscribe((data) => {
        callback();
      });
  }
}
