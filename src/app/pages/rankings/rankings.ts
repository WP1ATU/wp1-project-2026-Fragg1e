import { Component } from '@angular/core';
import { SnookerApi } from '../../services/snooker-api';
import { Ranking } from '../../models/ranking';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.html',
  styleUrl: './rankings.css'
})
export class Rankings {
  rankings: Ranking[] = [];
  loading = false;
  error = '';

  constructor(private snookerApi: SnookerApi) {}

  loadRankings() {
    this.loading = true;
    this.error = '';

    this.snookerApi.getRankings().subscribe({
      next: (data) => {
        this.rankings = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load rankings. Please try again later.';
        this.loading = false;
      }
    });
  }
}
