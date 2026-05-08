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

  savePrediction(prediction: Prediction): Observable<SavedPrediction> {
    return this.http.post<SavedPrediction>(this.apiUrl, prediction);
  }

  getSavedPredictions(): Observable<SavedPrediction[]> {
    return this.http.get<SavedPrediction[]>(this.apiUrl);
  }

  deletePrediction(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
