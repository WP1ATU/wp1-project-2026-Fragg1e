import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../models/player';
import { SnookerApi } from '../../services/snooker-api';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.css'
})
export class PlayerProfile {
  player?: Player;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private snookerApi: SnookerApi
  ) {
    const playerId = Number(this.route.snapshot.paramMap.get('id'));

    this.snookerApi.getPlayerById(playerId).subscribe({
      next: (data) => {
        this.player = data;
      },
      error: () => {
        this.error = 'Could not load player details.';
      }
    });
  }
}
