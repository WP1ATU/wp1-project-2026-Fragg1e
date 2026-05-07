import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Player } from '../../models/player';
import { SnookerApi } from '../../services/snooker-api';

@Component({
  selector: 'app-players',
  imports: [RouterLink],
  templateUrl: './players.html',
  styleUrl: './players.css'
})
export class Players {
  players: Player[] = [];
  loading = false;
  error = '';

  constructor(private snookerApi: SnookerApi) {}

  loadPlayers() {
    this.loading = true;
    this.error = '';

    this.snookerApi.getPlayers().subscribe({
      next: (data) => {
        this.players = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load players. Please try again later.';
        this.loading = false;
      }
    });
  }
}
