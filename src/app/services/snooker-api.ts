import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/match';
import { Player } from '../models/player';
import { Ranking } from '../models/ranking';

@Injectable({
  providedIn: 'root'
})
export class SnookerApi {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getLiveMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/live-matches`);
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/players`);
  }

  getRankings(): Observable<Ranking[]> {
    return this.http.get<Ranking[]>(`${this.apiUrl}/rankings`);
  }
}
