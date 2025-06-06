import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialer-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialer-modal.component.html',
  styleUrls: ['./dialer-modal.component.css']
})
export class DialerModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() makeCall = new EventEmitter<string>();

  dialedNumber: string = '';

  close(): void {
    this.dialedNumber = '';
    this.closeModal.emit();
  }

  addDigit(digit: string): void {
    this.dialedNumber += digit;
  }

  deleteDigit(): void {
    this.dialedNumber = this.dialedNumber.slice(0, -1);
  }

  onMakeCall(): void {
    if (this.dialedNumber) {
      this.makeCall.emit(this.dialedNumber);
      this.close();
    }
  }

  onOverlayClick(): void {
    this.close();
  }

  onModalClick(event: Event): void {
    event.stopPropagation();
  }
}
