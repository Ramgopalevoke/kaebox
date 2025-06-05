import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isVisible: boolean = true;
  currentRoute: string = 'inbox';

  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to router events to keep track of the current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Extract the main route segment
      const urlPath = event.urlAfterRedirects.split('/')[1] || 'inbox';
      this.currentRoute = urlPath;
    });

    // Set initial route
    const initialPath = this.router.url.split('/')[1] || 'inbox';
    this.currentRoute = initialPath;
  }

  toggleSidebar() {
    this.isVisible = !this.isVisible;
  }
}