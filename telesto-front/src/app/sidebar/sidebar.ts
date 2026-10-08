import { Component } from '@angular/core';
import { MenuItems } from '../services/interfaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  expanded = false

  menuItems: MenuItems[] = [
    {
      icon: 'dashboard', name: 'dashboard', route: '/'
    },
    {
      icon: 'calendar_today', name: 'Schedule', route: '/calendar'
    },
    {
      icon: 'list_alt', name: 'Lists', route: '/'
    },
    {
      icon: 'sentiment_satisfied_alt', name: 'Profile', route: '/user'
    }
  ]

  toggle() {
    this.expanded = !this.expanded
  }
}
