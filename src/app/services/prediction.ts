import { Injectable } from '@angular/core';
import { Prediction } from '../models/prediction';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  createUserPrediction( //creates prediction based on user input
    playerOneName: string,
    playerTwoName: string,
    predictedWinnerName: string,
    reason: string
  ): Prediction {
    return {
      playerOneName,
      playerTwoName,
      predictedWinnerName,
      reason
    };
  }
}
