import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnookerApi } from '../../services/snooker-api';
import { Match } from '../../models/match';

@Component({
  selector: 'app-live-matches',
  imports: [CommonModule],
  templateUrl: './live-matches.html',
  styleUrl: './live-matches.css'
})
export class LiveMatches implements OnInit {
  liveMatches: Match[] = [];
  upcomingMatches: Match[] = [];
  loadingLive = false;
  loadingUpcoming = false;
  liveError = '';
  upcomingError = '';

  constructor(private snookerApi: SnookerApi) {}

  ngOnInit() {
    this.loadLiveMatches();
    this.loadUpcomingMatches();
  }

  loadLiveMatches() {
    this.loadingLive = true;
    this.liveError = '';

    this.snookerApi.getLiveMatches().subscribe({
      next: (data) => {
        this.liveMatches = data;
        this.loadingLive = false;
      },
      error: () => {
        this.liveError = 'Could not load live matches.';
        this.loadingLive = false;
      }
    });
  }

  loadUpcomingMatches() {
    this.loadingUpcoming = true;
    this.upcomingError = '';

    this.snookerApi.getUpcomingMatches().subscribe({
      next: (data) => {
        this.upcomingMatches = data;
        this.loadingUpcoming = false;
      },
      error: () => {
        this.upcomingError = 'Could not load upcoming matches.';
        this.loadingUpcoming = false;
      }
    });
  }
}
