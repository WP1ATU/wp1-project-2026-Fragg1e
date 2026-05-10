import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SavedPrediction } from '../../models/saved-prediction';

@Component({
  selector: 'app-prediction-card',
  imports: [DatePipe],
  templateUrl: './prediction-card.html',
  styleUrl: './prediction-card.css'
})
export class PredictionCard {
  @Input() prediction!: SavedPrediction;
  @Output() deletePrediction = new EventEmitter<string | undefined>();
}
