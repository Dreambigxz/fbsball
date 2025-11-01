import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-quick-notifications',
  imports: [CommonModule],
  templateUrl: './quick-notifications.component.html',
  styleUrl: './quick-notifications.component.css'
})
export class QuickNotificationsComponent {

  notifications: string[] = [];
  showNotifications = false;
  currentNotification: string | null = null;
  currentIndex = 0;


  ngOnInit() {
  // Sample notifications
  this.notifications = [
  'Welcome to our site!',
  'New betting event starts at 8 PM.',
  'Team rankings updated — check out the leaderboard!',
  'Earn bonuses for daily logins.'
  ];


  // Show box after 20 seconds
  setTimeout(() => {
    this.showNotifications = true;
    this.showNextNotification();
  }, 0);
  }


  showNextNotification() {
    if (!this.notifications.length) return;

    this.currentNotification = this.notifications[this.currentIndex];

    this.currentIndex++;
    if (this.currentIndex >= this.notifications.length) {
      this.currentIndex = 0; // loop back to start
    }

   setTimeout(() => this.showNextNotification(), 4000); // change notification every 4s
  }

}
