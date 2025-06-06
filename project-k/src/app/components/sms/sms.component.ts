import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent {
  // In future, you can add SMS data as @Input() if needed
}
