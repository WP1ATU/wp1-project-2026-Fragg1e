import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  liveMatches = [
    {
      playerOne: 'Ronnie O\'Sullivan',
      playerTwo: 'Judd Trump',
      score: '3 - 2',
      frame: 6,
      break: 42
    },
    {
      playerOne: 'Mark Selby',
      playerTwo: 'Shaun Murphy',
      score: '1 - 1',
      frame: 3,
      break: 18
    }
  ];

  players = [
    { name: 'Ronnie O\'Sullivan', rank: 1, winRate: '74%', averageBreak: 58 },
    { name: 'Judd Trump', rank: 2, winRate: '71%', averageBreak: 55 },
    { name: 'Mark Selby', rank: 3, winRate: '68%', averageBreak: 49 }
  ];

  prediction = {
    playerOne: 'Ronnie O\'Sullivan',
    playerTwo: 'Judd Trump',
    playerOneChance: 56,
    playerTwoChance: 44,
    note: 'Placeholder prediction based on sample form and ranking data.'
  };
}
