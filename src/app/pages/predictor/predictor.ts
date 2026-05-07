import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Prediction } from '../../models/prediction';
import { Ranking } from '../../models/ranking';
import { PredictionService } from '../../services/prediction';
import { SavedPredictionService } from '../../services/saved-prediction';
import { SnookerApi } from '../../services/snooker-api';

@Component({
  selector: 'app-predictor',
  imports: [FormsModule],
  templateUrl: './predictor.html',
  styleUrl: './predictor.css'
})
export class Predictor {
  rankings: Ranking[] = [];
  selectedPlayerOneId = '';
  selectedPlayerTwoId = '';
  prediction?: Prediction;
  message = '';
  error = '';

  constructor(
    private snookerApi: SnookerApi,
    private predictionService: PredictionService,
    private savedPredictionService: SavedPredictionService
  ) {}

  loadRankings() {
    this.error = '';

    this.snookerApi.getRankings().subscribe({
      next: (data) => {
        this.rankings = data;
      },
      error: () => {
        this.error = 'Could not load rankings for predictor.';
      }
    });
  }

  createPrediction() {
    const playerOne = this.rankings.find(
      (player) => player.PlayerID === Number(this.selectedPlayerOneId)
    );

    const playerTwo = this.rankings.find(
      (player) => player.PlayerID === Number(this.selectedPlayerTwoId)
    );

    if (!playerOne || !playerTwo) {
      this.error = 'Please select two players.';
      return;
    }

    this.prediction = this.predictionService.createPrediction(playerOne, playerTwo);
  }

  savePrediction() {
    if (!this.prediction) {
      return;
    }

    this.savedPredictionService.savePrediction(this.prediction).subscribe({
      next: () => {
        this.message = 'Prediction saved.';
      },
      error: () => {
        this.error = 'Could not save prediction.';
      }
    });
  }
}
