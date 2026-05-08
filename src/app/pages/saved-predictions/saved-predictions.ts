import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SavedPrediction } from '../../models/saved-prediction';
import { SavedPredictionService } from '../../services/saved-prediction';

@Component({
  selector: 'app-saved-predictions',
  imports: [CommonModule, DatePipe],
  templateUrl: './saved-predictions.html',
  styleUrl: './saved-predictions.css'
})
export class SavedPredictions implements OnInit {
  predictions: SavedPrediction[] = [];
  loading = false;
  error = '';

  constructor(private savedPredictionService: SavedPredictionService) {}

  ngOnInit() {
    this.loadPredictions();
  }

  loadPredictions() {
    this.loading = true;
    this.error = '';

    this.savedPredictionService.getSavedPredictions().subscribe({
      next: (data) => {
        this.predictions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load saved predictions.';
        this.loading = false;
      }
    });
  }

  deletePrediction(id: string | undefined) {
    if (!id) {
      return;
    }

    this.savedPredictionService.deletePrediction(id).subscribe({
      next: () => {
        this.loadPredictions();
      },
      error: () => {
        this.error = 'Could not delete prediction.';
      }
    });
  }
}
