import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prediction } from '../models/prediction';
import { SavedPrediction } from '../models/saved-prediction';

@Injectable({
  providedIn: 'root'
})
export class SavedPredictionService {
  private apiUrl = 'http://18.201.114.135:3000/api/predictions';

  constructor(private http: HttpClient) {}

  savePrediction(prediction: Prediction): Observable<SavedPrediction> { //saves prediction to backend
    return this.http.post<SavedPrediction>(this.apiUrl, prediction);
  }

  getSavedPredictions(): Observable<SavedPrediction[]> { //gets saved predictions from backend
    return this.http.get<SavedPrediction[]>(this.apiUrl);
  }

  deletePrediction(id: string): Observable<{ message: string }> { //deletes prediction from backend
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
