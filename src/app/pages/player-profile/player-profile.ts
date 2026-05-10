import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerProfileCard } from '../../components/player-profile-card/player-profile-card';
import { Player } from '../../models/player';
import { SnookerApi } from '../../services/snooker-api';

@Component({
  selector: 'app-player-profile',
  imports: [PlayerProfileCard],
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
    const playerId = Number(this.route.snapshot.paramMap.get('id')); //gets player id from route parameters

    this.snookerApi.getPlayerById(playerId).subscribe({ //calls backend to get player details
      next: (data) => {
        this.player = data;
      },
      error: () => {
        this.error = 'Could not load player details.';
      }
    });
  }
}

