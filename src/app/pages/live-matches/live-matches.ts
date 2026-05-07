import { Component } from '@angular/core';
import { Match } from '../../models/match';
import { SnookerApi } from '../../services/snooker-api';

@Component({
  selector: 'app-live-matches',
  templateUrl: './live-matches.html',
  styleUrl: './live-matches.css'
})
export class LiveMatches {
  matches: Match[] = [];
  loading = false;
  error = '';

  constructor(private snookerApi: SnookerApi) {}

  loadMatches() {
    this.loading = true;
    this.error = '';

    this.snookerApi.getLiveMatches().subscribe({
      next: (data) => {
        this.matches = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load live matches. Please wait a minute and try again.';
        this.loading = false;
      }
    });
  }
}
