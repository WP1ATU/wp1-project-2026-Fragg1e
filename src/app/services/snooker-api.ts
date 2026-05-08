import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
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

  getPlayerById(id: number): Observable<Player | undefined> {
    return new Observable((observer) => {
      this.getPlayers().subscribe({
        next: (players) => {
          const player = players.find((item) => item.ID === id);
          observer.next(player);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

getRankings(): Observable<Ranking[]> {
  return forkJoin({
    rankings: this.http.get<Ranking[]>(`${this.apiUrl}/rankings`),
    players: this.getPlayers()
  }).pipe(
    map((data) => {
      return data.rankings.map((ranking) => {
        const player = data.players.find((item) => item.ID === ranking.PlayerID);

        return {
          ...ranking,
          PlayerName: player ? `${player.FirstName} ${player.LastName}` : `Player ${ranking.PlayerID}`
        };
      });
    })
  );
  }

  getUpcomingMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/upcoming-matches`);
  }
}
