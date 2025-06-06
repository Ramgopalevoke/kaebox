import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialerModalComponent } from '../dialer-modal/dialer-modal.component';

@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [CommonModule, DialerModalComponent],
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css']
})
export class CallsComponent {
  @Input() calls: any[] = [];
  
  // Dialer modal properties
  isDialerModalOpen: boolean = false;

  // Dialer modal methods
  openDialerModal(): void {
    this.isDialerModalOpen = true;
  }
  
  closeDialerModal(): void {
    this.isDialerModalOpen = false;
  }
  
  makeCall(number: string): void {
    // In a real app, this would initiate a call
    console.log('Making call to:', number);
    alert(`Calling ${number}...`);
  }
}
