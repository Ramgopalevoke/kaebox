import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isActivityViewSubject = new BehaviorSubject<boolean>(false);
  public isActivityView$ = this.isActivityViewSubject.asObservable();

  constructor(private router: Router) {
    // Listen for route changes to determine if we're in activity view
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const isActivityRoute = event.url.includes('/activity/');
      this.isActivityViewSubject.next(isActivityRoute);
    });
  }

  get isActivityView(): boolean {
    return this.isActivityViewSubject.value;
  }
}
