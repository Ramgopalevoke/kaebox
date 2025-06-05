import { Component } from '@angular/core';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-k';

  constructor(public appService: AppService) {
    // Subscribe to router events to detect when we're in activity view
    this.appService.isActivityView$.subscribe(isActivityView => {
      console.log('Activity view state changed:', isActivityView);
    });
  }

  // Additional methods for handling global events can be added here
}