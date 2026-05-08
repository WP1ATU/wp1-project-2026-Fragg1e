import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, shareReplay } from 'rxjs';
import { Match } from '../models/match';
import { Player } from '../models/player';
import { Ranking } from '../models/ranking';

@Injectable({
  providedIn: 'root'
})
export class SnookerApi {
  private apiUrl = 'http://localhost:3000/api';
  private playersCache?: Observable<Player[]>;
  private upcomingMatchesCache?: Observable<Match[]>;

  constructor(private http: HttpClient) {}

  getLiveMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/live-matches`);
  }

  getPlayers(): Observable<Player[]> {
  const cachedPlayers = localStorage.getItem('players');

  if (cachedPlayers) {
    return new Observable((observer) => {
      observer.next(JSON.parse(cachedPlayers));
      observer.complete();
    });
  }

  if (!this.playersCache) {
    this.playersCache = this.http
      .get<Player[]>(`${this.apiUrl}/players`)
      .pipe(
        map((players) => {
          localStorage.setItem('players', JSON.stringify(players));
          return players;
        }),
        shareReplay(1)
      );
  }

  return this.playersCache;
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
  const cachedMatches = localStorage.getItem('upcomingMatches');

  if (cachedMatches) {
    const cache = JSON.parse(cachedMatches);

    if (Date.now() - cache.time < 30 * 60 * 1000) {
      return of(cache.data);
    }
  }

  if (!this.upcomingMatchesCache) {
    this.upcomingMatchesCache = this.http.get<Match[]>(`${this.apiUrl}/upcoming-matches`).pipe(
      map((matches) => {
        localStorage.setItem('upcomingMatches', JSON.stringify({
          time: Date.now(),
          data: matches
        }));

        return matches;
      }),
      shareReplay(1)
    );
  }

  return this.upcomingMatchesCache;
}



}
