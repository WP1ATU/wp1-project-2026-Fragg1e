import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ranking } from '../../models/ranking';
import { Prediction } from '../../models/prediction';
import { SnookerApi } from '../../services/snooker-api';
import { SavedPredictionService } from '../../services/saved-prediction';

@Component({
  selector: 'app-predictor',
  imports: [CommonModule, FormsModule],
  templateUrl: './predictor.html',
  styleUrl: './predictor.css'
})
export class Predictor implements OnInit {
  players: Ranking[] = [];
  loading = false;
  selectedPlayerOneId = 0;
  selectedPlayerTwoId = 0;
  predictedWinnerName = '';
  reason = '';
  prediction?: Prediction;
  error = '';
  feedback = '';

  constructor(
    private snookerApi: SnookerApi,
    private savedPredictionService: SavedPredictionService
  ) {}

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.loading = true;
    this.error = '';

    this.snookerApi.getRankings().subscribe({
      next: (data) => {
        this.players = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load players.';
        this.loading = false;
      }
    });
  }

  savePrediction() {
    const playerOne = this.players.find((player) => player.PlayerID === Number(this.selectedPlayerOneId));
    const playerTwo = this.players.find((player) => player.PlayerID === Number(this.selectedPlayerTwoId));

    if (!playerOne || !playerTwo || !this.predictedWinnerName || !this.reason) {
      this.error = 'Please select two players, choose a winner, and enter a reason.';
      return;
    }

    const prediction = {
      playerOneName: playerOne.PlayerName || 'Player one',
      playerTwoName: playerTwo.PlayerName || 'Player two',
      predictedWinnerName: this.predictedWinnerName,
      reason: this.reason
    };

    this.savedPredictionService.savePrediction(prediction).subscribe({
      next: () => {
        this.feedback = 'Prediction saved successfully.';
        this.error = '';
        this.prediction = prediction;
      },
      error: () => {
        this.error = 'Could not save prediction.';
      }
    });
  }

  resetPrediction() {
    this.selectedPlayerOneId = 0;
    this.selectedPlayerTwoId = 0;
    this.predictedWinnerName = '';
    this.reason = '';
    this.prediction = undefined;
    this.error = '';
    this.feedback = '';
  }
}
