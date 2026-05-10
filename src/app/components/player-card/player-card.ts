import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player-card',
  imports: [RouterLink],
  templateUrl: './player-card.html',
  styleUrl: './player-card.css'
})
export class PlayerCard {
  @Input() player!: Player;
}
