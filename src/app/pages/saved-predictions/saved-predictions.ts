import { Component } from '@angular/core';
import { SavedPrediction } from '../../models/saved-prediction';
import { SavedPredictionService } from '../../services/saved-prediction';

@Component({
  selector: 'app-saved-predictions',
  templateUrl: './saved-predictions.html',
  styleUrl: './saved-predictions.css'
})
export class SavedPredictions {
  predictions: SavedPrediction[] = [];
  error = '';

  constructor(private savedPredictionService: SavedPredictionService) {}

  loadPredictions() {
    this.error = '';

    this.savedPredictionService.getSavedPredictions().subscribe({
      next: (data) => {
        this.predictions = data;
      },
      error: () => {
        this.error = 'Could not load saved predictions.';
      }
    });
  }
}
