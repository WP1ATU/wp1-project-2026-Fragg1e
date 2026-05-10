import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SnookerEvent } from '../../models/event';

@Component({
  selector: 'app-event-profile-card',
  imports: [DatePipe],
  templateUrl: './event-profile-card.html',
  styleUrl: './event-profile-card.css'
})
export class EventProfileCard {
  @Input() event!: SnookerEvent;
}
