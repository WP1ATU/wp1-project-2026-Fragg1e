import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ranking } from '../../models/ranking';
import { SnookerApi } from '../../services/snooker-api';

@Component({
  selector: 'app-rankings',
  imports: [FormsModule],
  templateUrl: './rankings.html',
  styleUrl: './rankings.css'
})
export class Rankings implements OnInit {
  rankings: Ranking[] = [];
  searchText = '';
  loading = false;
  error = '';

  constructor(private snookerApi: SnookerApi) {}

  ngOnInit() {
    this.loadRankings();
  }

  loadRankings() {
    this.loading = true;
    this.error = '';

    this.snookerApi.getRankings().subscribe({
      next: (data) => {
        this.rankings = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load rankings.';
        this.loading = false;
      }
    });
  }

  get filteredRankings() { //filters basdxed on search
    return this.rankings.filter((ranking) => {
      const playerName = ranking.PlayerName?.toLowerCase() || '';
      return playerName.includes(this.searchText.toLowerCase());
    });
  }
}

