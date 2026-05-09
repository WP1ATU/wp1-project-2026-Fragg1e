import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Player } from '../../models/player';
import { SnookerApi } from '../../services/snooker-api';

@Component({
  selector: 'app-players',
  imports: [FormsModule, RouterLink],
  templateUrl: './players.html',
  styleUrl: './players.css'
})
export class Players implements OnInit {
  players: Player[] = [];
  searchText = '';
  sortColumn = '';
  sortDirection = 'desc';
  loading = false;
  error = '';

  constructor(private snookerApi: SnookerApi) {}

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.loading = true;
    this.error = '';

    this.snookerApi.getPlayers().subscribe({
      next: (data) => {
        this.players = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load players.';
        this.loading = false;
      }
    });
  }

  get filteredPlayers() { 
    const filtered = this.players.filter((player) => { //filters players based on search text
      const fullName = `${player.FirstName} ${player.LastName}`.toLowerCase();
      return fullName.includes(this.searchText.toLowerCase());
    });

    if (this.sortColumn === 'titles') { //sorts players based on number of ranking titles
      return filtered.sort((a, b) => {
        const first = a.NumRankingTitles || 0;
        const second = b.NumRankingTitles || 0;

        return this.sortDirection === 'desc' ? second - first : first - second;
      });
    }

    if (this.sortColumn === 'maximums') { //sorts players based on number of maximumss
      return filtered.sort((a, b) => {
        const first = a.NumMaximums || 0;
        const second = b.NumMaximums || 0;

        return this.sortDirection === 'desc' ? second - first : first - second;
      });
    }

    return filtered;
  }

  sortPlayers(column: string) { //handles sorting when user clicks on column header
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'; //toggles sort direction if same column is clicked
    } else {
      this.sortColumn = column;
      this.sortDirection = 'desc';
    }
  }

}

