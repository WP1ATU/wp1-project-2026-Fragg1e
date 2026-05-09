import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { LiveMatches } from './pages/live-matches/live-matches';
import { Rankings } from './pages/rankings/rankings';
import { Players } from './pages/players/players';
import { PlayerProfile } from './pages/player-profile/player-profile';
import { Predictor } from './pages/predictor/predictor';
import { SavedPredictions } from './pages/saved-predictions/saved-predictions';
import { EventProfile } from './pages/event-profile/event-profile';


export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'live', component: LiveMatches },
  { path: 'rankings', component: Rankings },
  { path: 'players', component: Players },
  { path: 'players/:id', component: PlayerProfile },
  { path: 'predictor', component: Predictor },
  { path: 'saved', component: SavedPredictions },
  { path: 'events/:id', component: EventProfile },
];
