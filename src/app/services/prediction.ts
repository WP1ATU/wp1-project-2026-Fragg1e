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

    const playerOneName = playerOne.PlayerName || `Player ${playerOne.PlayerID}`;
    const playerTwoName = playerTwo.PlayerName || `Player ${playerTwo.PlayerID}`;

    if (playerOne.Position < playerTwo.Position) {
      playerOneChance += 10;
      factors.push(`${playerOneName} has the better ranking.`);
    } else if (playerTwo.Position < playerOne.Position) {
      playerOneChance -= 10;
      factors.push(`${playerTwoName} has the better ranking.`);
    } else {
      factors.push('Both players have the same ranking position.');
    }

    return {
      playerOneName,
      playerTwoName,
      playerOneChance,
      playerTwoChance: 100 - playerOneChance,
      factors
    };
  }
}
