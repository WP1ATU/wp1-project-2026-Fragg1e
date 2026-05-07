import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prediction } from '../models/prediction';
import { SavedPrediction } from '../models/saved-prediction';

@Injectable({
  providedIn: 'root'
})
export class SavedPredictionService {
  private apiUrl = 'http://localhost:3000/api/predictions';

  constructor(private http: HttpClient) {}

  getSavedPredictions(): Observable<SavedPrediction[]> {
    return this.http.get<SavedPrediction[]>(this.apiUrl);
  }

  savePrediction(prediction: Prediction): Observable<SavedPrediction> {
    return this.http.post<SavedPrediction>(this.apiUrl, prediction);
  }
}
