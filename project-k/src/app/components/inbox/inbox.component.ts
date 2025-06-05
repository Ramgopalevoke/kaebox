// filepath: c:\Users\lavanya\OneDrive\Desktop\Angular\k-project\src\app\components\inbox\inbox.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from '../message-item/message-item.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, MessageItemComponent],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, AfterViewChecked {
  @ViewChild('activityCheckbox', { static: false }) activityCheckbox!: ElementRef;
  isLoading: boolean = true;
  messages: any[] = [
    { 
      id: 1, 
      sender: 'Emily Cook', 
      content: '415-888-8888', 
      time: '2:15 PM', 
      type: 'phone',
      starred: true,
      category: 'inbox',
      isSelected: false,
      isRead: false
    },
    { 
      id: 2, 
      sender: 'Emily Cook', 
      content: 'Hello!', 
      time: '2:15 PM', 
      type: 'whatsapp',
      starred: false,
      category: 'inbox',
      isSelected: false,
      isRead: false
    },
    { 
      id: 3, 
      sender: 'Emily Cook', 
      content: 'My order number is not shown on my app', 
      time: '2:15 PM', 
      type: 'message',
      starred: false,
      category: 'inbox',
      isSelected: false,
      isRead: false
    }
  ];

  currentRoute: string = 'inbox';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading = true;
    
    // Simulate loading data from an API
    setTimeout(() => {
      this.isLoading = false;
      
      // Initial checkbox state update after data loading
      setTimeout(() => this.updateCheckboxState(), 0);
    }, 500);
  }

  onMessageSelectionChange(event: {message: any, selected: boolean}) {
    console.log(`Message ${event.message.id} selection changed to ${event.selected}`);
    // Update the message selection state
    const message = this.messages.find(m => m.id === event.message.id);
    if (message) {
      message.isSelected = event.selected;
      
      // Update checkbox state to reflect indeterminate status
      this.updateCheckboxState();
      
      // Log checkbox state after change
      this.logCheckboxState();
    }
  }

  // Check if any messages are selected
  areAnyMessagesSelected(): boolean {
    return this.messages.some(message => message.isSelected);
  }

  // Check if all messages are selected
  areAllMessagesSelected(): boolean {
    return this.messages.length > 0 && this.messages.every(message => message.isSelected);
  }

  // Check if some but not all messages are selected
  areSomeMessagesSelected(): boolean {
    return this.areAnyMessagesSelected() && !this.areAllMessagesSelected();
  }
  // Toggle select all messages
  toggleSelectAll(event: any): void {
    // Get the current state of the checkbox
    const isChecked = event.target.checked;
    const wasIndeterminate = event.target.indeterminate;
    
    // If checkbox was indeterminate and now being clicked, 
    // we want to select all regardless of the checked state
    // (since indeterminate doesn't have a well-defined next state)
    const newSelectedState = wasIndeterminate ? true : isChecked;
    
    console.log(`Toggle select all: isChecked=${isChecked}, wasIndeterminate=${wasIndeterminate}, newState=${newSelectedState}`);
    
    this.messages.forEach(message => {
      message.isSelected = newSelectedState;
    });
    
    // Update checkbox state
    this.updateCheckboxState();
  }
  
  // Navigate to activity overview for a specific message
  viewMessageActivity(message: any): void {
    const id = message.id || message.sender.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['/activity', id]);
  }
  
  // Update the indeterminate state of the checkbox
  ngAfterViewChecked(): void {
    this.updateCheckboxState();
  }
  
  // Previous states to avoid unnecessary DOM updates
  private previousIndeterminateState: boolean = false;
  private previousCheckedState: boolean = false;
  
  // Update the checkbox state programmatically
  updateCheckboxState(): void {
    if (this.activityCheckbox && this.activityCheckbox.nativeElement) {
      const isIndeterminate = this.areSomeMessagesSelected() && !this.areAllMessagesSelected();
      const isChecked = this.areAllMessagesSelected();
      
      // Only update the DOM if the state has changed
      if (this.previousIndeterminateState !== isIndeterminate) {
        this.activityCheckbox.nativeElement.indeterminate = isIndeterminate;
        this.previousIndeterminateState = isIndeterminate;
        console.log('Checkbox indeterminate state updated to:', isIndeterminate);
      }
      
      // Update the checked state if it changed
      if (this.previousCheckedState !== isChecked) {
        this.activityCheckbox.nativeElement.checked = isChecked;
        this.previousCheckedState = isChecked;
        console.log('Checkbox checked state updated to:', isChecked);
      }
    }
  }
  
  // Debug checkbox states
  logCheckboxState(): void {
    console.log('Checkbox States:');
    console.log('Any Messages Selected:', this.areAnyMessagesSelected());
    console.log('All Messages Selected:', this.areAllMessagesSelected());
    console.log('Some Messages Selected:', this.areSomeMessagesSelected());
    console.log('Indeterminate State:', this.areSomeMessagesSelected() && !this.areAllMessagesSelected());
    
    if (this.activityCheckbox && this.activityCheckbox.nativeElement) {
      console.log('Actual DOM Checkbox State:');
      console.log('- Checked:', this.activityCheckbox.nativeElement.checked);
      console.log('- Indeterminate:', this.activityCheckbox.nativeElement.indeterminate);
    }
    
    console.log('Messages:', this.messages.map(m => ({id: m.id, selected: m.isSelected})));
    
    // Update the checkbox state immediately when logging
    this.updateCheckboxState();
  }

  // Handle deleting selected messages
  deleteSelectedMessages(): void {
    // In a real app, this would send a request to delete the messages
    console.log('Deleting selected messages');
    // Remove selected messages from the array
    this.messages = this.messages.filter(message => !message.isSelected);
    
    // Update checkbox state after deletion
    this.updateCheckboxState();
  }
  
  // Handle marking selected messages as read
  markSelectedMessagesAsRead(): void {
    // In a real app, this would send a request to mark messages as read
    console.log('Marking selected messages as read');
    // Mark selected messages as read
    this.messages.forEach(message => {
      if (message.isSelected) {
        message.isRead = true;
        message.isSelected = false; // Deselect after marking as read
      }
    });
    
    // Update checkbox state after marking as read
    this.updateCheckboxState();
  }
}
