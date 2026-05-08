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
      factors.push(`Player ${playerOne.PlayerID} has the better ranking.`);
    } else if (playerTwo.Position < playerOne.Position) {
      playerOneChance -= 10;
      factors.push(`Player ${playerTwo.PlayerID} has the better ranking.`);
    } else {
      factors.push('Both players have the same ranking position.');
    }

    return {
      playerOneName: `Player ${playerOne.PlayerID}`,
      playerTwoName: `Player ${playerTwo.PlayerID}`,
      playerOneChance,
      playerTwoChance: 100 - playerOneChance,
      factors
    };
  }
}
