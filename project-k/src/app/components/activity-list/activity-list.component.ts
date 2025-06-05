import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent],
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent {
  messages = [
    { 
      id: 1, 
      sender: 'Emily Cook', 
      content: '415-888-8888', 
      time: '2:15 PM', 
      type: 'phone',
      starred: true
    },
    { 
      id: 2, 
      sender: 'Emily Cook', 
      content: 'Hello!', 
      time: '2:15 PM', 
      type: 'whatsapp',
      starred: false
    },
    { 
      id: 3, 
      sender: 'Emily Cook', 
      content: 'My order number is not shown on my app', 
      time: '2:15 PM', 
      type: 'message',
      starred: false
    }
  ];

  constructor() {}
}