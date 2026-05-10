import { Component, Input } from '@angular/core';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player-profile-card',
  templateUrl: './player-profile-card.html',
  styleUrl: './player-profile-card.css'
})
export class PlayerProfileCard {
  @Input() player!: Player;
}
