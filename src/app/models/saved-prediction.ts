export interface SavedPrediction {
  _id?: string;
  playerOneName: string;
  playerTwoName: string;
  playerOneChance: number;
  playerTwoChance: number;
  factors: string[];
  createdAt?: string;
}
