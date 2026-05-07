import { Injectable } from '@angular/core';
import { Prediction } from '../models/prediction';
import { Ranking } from '../models/ranking';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  createPrediction(playerOne: Ranking, playerTwo: Ranking): Prediction {
    let playerOneChance = 50;
    const factors: string[] = [];

    if (playerOne.Position < playerTwo.Position) {
      playerOneChance += 10;
      factors.push(`${playerOne.PlayerName} has the better ranking.`);

    } else if (playerTwo.Position < playerOne.Position) {
      playerOneChance -= 10;
      factors.push(`${playerTwo.PlayerName} has the better ranking.`);
      
    } else {
      factors.push('Both players have a similar ranking.');
    }

    return {
      playerOneName: playerOne.PlayerName || 'Player One',
      playerTwoName: playerTwo.PlayerName || 'Player Two',
      playerOneChance,
      playerTwoChance: 100 - playerOneChance,
      factors
    };
  }
}
