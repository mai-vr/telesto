import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

interface IMenuItems {
  icon: string,
  text: string,
  route: string
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar {
  expanded: boolean = false
  menuItems: IMenuItems[] = [
    { icon: 'calendar_today', text: 'schedule', route: '/' },
    { icon: 'settings', text: 'settings', route: '/user' },
    { icon: 'turned_in_not', text: 'save', route: '/' }
  ]

  toggle() {
    this.expanded = !this.expanded
  }
}
