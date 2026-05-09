import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Player } from '../../models/player';
import { SnookerApi } from '../../services/snooker-api';

@Component({
  selector: 'app-players',
  imports: [CommonModule, FormsModule, RouterLink],
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
    const filtered = this.players.filter((player) => {
      const fullName = `${player.FirstName} ${player.LastName}`.toLowerCase();
      return fullName.includes(this.searchText.toLowerCase());
    });

    if (this.sortColumn === 'titles') {
      return filtered.sort((a, b) => {
        const first = a.NumRankingTitles || 0;
        const second = b.NumRankingTitles || 0;

        return this.sortDirection === 'desc' ? second - first : first - second;
      });
    }

    if (this.sortColumn === 'maximums') {
      return filtered.sort((a, b) => {
        const first = a.NumMaximums || 0;
        const second = b.NumMaximums || 0;

        return this.sortDirection === 'desc' ? second - first : first - second;
      });
    }

    return filtered;
  }

  sortPlayers(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'desc';
    }
  }

}
