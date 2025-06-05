import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
    

export class MessageItemComponent {
  @Input() message: any;
  @Output() selectionChange = new EventEmitter<{message: any, selected: boolean}>();
  
  // Use getter and setter to sync isSelected with message.isSelected
  get isSelected(): boolean {
    return this.message?.isSelected || false;
  }
  
  set isSelected(value: boolean) {
    if (this.message) {
      this.message.isSelected = value;
    }
  }

  constructor() {}

  toggleStar(event: MouseEvent) {
    event.stopPropagation(); // Prevent the click from triggering the openActivityOverview method
    this.message.starred = !this.message.starred;
  }
  
  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.isSelected = target.checked;
    
    console.log(`Message ${this.message.id} checkbox changed to ${this.isSelected}`);
    
    // Emit event when selection changes to notify parent components
    this.selectionChange.emit({message: this.message, selected: this.isSelected});
  }
  
  toggleSelection(event: MouseEvent) {
    event.stopPropagation(); // Prevent the click from triggering the openActivityOverview method
    
    // Toggle the selection state
    this.isSelected = !this.isSelected;
    
    console.log(`Message ${this.message.id} selection toggled to ${this.isSelected}`);
    
    // Emit event when selection changes to notify parent components
    this.selectionChange.emit({message: this.message, selected: this.isSelected});
    
    // Prevent default to ensure checkbox behavior is controlled purely by our code
    event.preventDefault();
  }
}