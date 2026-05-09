import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, shareReplay } from 'rxjs';
import { Match } from '../models/match';
import { Player } from '../models/player';
import { Ranking } from '../models/ranking';
import { SnookerEvent } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class SnookerApi {
  private apiUrl = 'http://34.254.151.3:3000/api';
  private playersCache?: Observable<Player[]>;
  private upcomingMatchesCache?: Observable<Match[]>;

  constructor(private http: HttpClient) {}

  getLiveMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/live-matches`);
  }

  getPlayers(): Observable<Player[]> {
    const cachedPlayers = localStorage.getItem('players');

    if (cachedPlayers) { //checks if players are cached 
      return of(JSON.parse(cachedPlayers));
    }

    if (!this.playersCache) { //else calls backend and caches result
      this.playersCache = this.http.get<Player[]>(`${this.apiUrl}/players`).pipe(
        map((players) => {
          localStorage.setItem('players', JSON.stringify(players));
          return players;
        }),
        shareReplay(1) //allows different pages to use same cached data
      );
    }
    return this.playersCache;
  }

  getPlayerById(id: number): Observable<Player | undefined> { //finds player by id using cached players data
    return this.getPlayers().pipe(
      map((players) => players.find((item) => item.ID === id))
    );
  }

  getRankings(): Observable<Ranking[]> { //combines rankings with player names 
    return forkJoin({
      rankings: this.http.get<Ranking[]>(`${this.apiUrl}/rankings`),
      players: this.getPlayers()
    }).pipe(
      map((data) => {
        return data.rankings.map((ranking) => {
          const matchingPlayer = data.players.find((player) => player.ID === ranking.PlayerID); //finds player for each ranking
          const playerName = matchingPlayer
            ? `${matchingPlayer.FirstName} ${matchingPlayer.LastName}` //formats player name
            : `Player ${ranking.PlayerID}`;

          return {
            ...ranking,
            PlayerName: playerName
          };
        });
      })
    );
  }


  getUpcomingMatches(): Observable<Match[]> { //checks if upcoming matches are cached and valid, else calls backend and caches 
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
          localStorage.setItem(
            'upcomingMatches',
            JSON.stringify({
              time: Date.now(),
              data: matches
            })
          );

          return matches;
        }),
        shareReplay(1)
      );
    }

    return this.upcomingMatchesCache;
  }

  getEventById(id: number): Observable<SnookerEvent> { //gets event details by id
    return this.http.get<SnookerEvent>(`${this.apiUrl}/events/${id}`);
  } 

}
