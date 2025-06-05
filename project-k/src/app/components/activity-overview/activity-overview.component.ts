import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-overview.component.html',
  styleUrls: ['./activity-overview.component.css']
})
export class ActivityOverviewComponent implements OnInit {
  userId: string | null = null;
  userData: any = {
    name: 'Emily Cook',
    email: 'ecook@gmail.com',
    phone: '415-888-8888',
    shipmentAddress: {
      street: '2258 26 Ave Elk Grove',
      city: 'CA 95758'
    },
    calls: [
      { 
        number: '415-888-8888', 
        type: 'Mobile',
        time: '12:24 pm'
      },
      { 
        number: '415-888-8888 (2)', 
        type: 'Mobile',
        time: '4:24 pm'
      }
    ]
  };
  activeTab: string = 'calls';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      // In a real app, you would fetch user data based on this ID
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}