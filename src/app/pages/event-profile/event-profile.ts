import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventProfileCard } from '../../components/event-profile-card/event-profile-card';
import { SnookerEvent } from '../../models/event';
import { SnookerApi } from '../../services/snooker-api';

@Component({
  selector: 'app-event-profile',
  templateUrl: './event-profile.html',
  styleUrl: './event-profile.css',
  imports: [EventProfileCard]
})
export class EventProfile {
  event?: SnookerEvent;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private snookerApi: SnookerApi
  ) {
    const eventId = Number(this.route.snapshot.paramMap.get('id')); //gets event id from route parameters

    this.snookerApi.getEventById(eventId).subscribe({ //calls backend to get event details
      next: (data) => {
        this.event = data;
      },
      error: () => {
        this.error = 'Could not load event details.';
      }
    });
  }
}
