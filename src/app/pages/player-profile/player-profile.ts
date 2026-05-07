import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.html',
  styleUrl: './player-profile.css'
})
export class PlayerProfile {
  playerId = '';

  constructor(private route: ActivatedRoute) {
    this.playerId = this.route.snapshot.paramMap.get('id') || '';
  }
}
