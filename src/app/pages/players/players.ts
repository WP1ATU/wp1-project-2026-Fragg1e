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
  loading = false;
  error = '';

  constructor(private snookerApi: SnookerApi) {}

  ngOnInit(){
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
    return this.players.filter((player) => {
      const fullName = `${player.FirstName} ${player.LastName}`.toLowerCase();
      return fullName.includes(this.searchText.toLowerCase());
    });
  }
}
