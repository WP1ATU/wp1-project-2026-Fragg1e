import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnookerApi } from '../../services/snooker-api';
import { Match } from '../../models/match';

@Component({
  selector: 'app-live-matches',
  imports: [CommonModule],
  templateUrl: './live-matches.html',
  styleUrl: './live-matches.css'
})
export class LiveMatches {
  matches: Match[] = [];
  loading = false;
  error = '';

  constructor(private snookerApi: SnookerApi) {}

  loadLiveMatches() {
    this.loading = true;
    this.error = '';

    this.snookerApi.getLiveMatches().subscribe({
      next: (data) => {
        this.matches = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load live matches.';
        this.loading = false;
      }
    });
  }

  loadUpcomingMatches() {
    this.loading = true;
    this.error = '';

    this.snookerApi.getUpcomingMatches().subscribe({
      next: (data) => {
        this.matches = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load upcoming matches.';
        this.loading = false;
      }
    });
  }
}
