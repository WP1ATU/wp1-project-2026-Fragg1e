import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Match } from '../../models/match';

@Component({
  selector: 'app-match-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './match-card.html',
  styleUrl: './match-card.css'
})
export class MatchCard {
  @Input() match!: Match;
  @Input() type: 'live' | 'upcoming' = 'upcoming';
}
