import { Component, OnInit } from '@angular/core';
import { SnookerApi } from '../../services/snooker-api';
import { Match } from '../../models/match';
import { MatchCard } from '../../components/match-card/match-card';


@Component({
  selector: 'app-live-matches',
  imports: [MatchCard],
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

  ngOnInit() { //runs when page loads
    this.loadLiveMatches();
    this.loadUpcomingMatches();
  }

  loadLiveMatches() {
    this.loadingLive = true;
    this.liveError = '';

    this.snookerApi.getLiveMatches().subscribe({ //calls backend to get live matches
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

    this.snookerApi.getUpcomingMatches().subscribe({ //calls backend to get upcoming matches
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

