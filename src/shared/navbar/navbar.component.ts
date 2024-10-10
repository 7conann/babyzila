import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../Service/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router, private sidebarService: SidebarService) { }

  ngOnInit() {
    console.log('NavbarComponent');
  }

  goToRoute(route: string) {
    this.route.navigate([route]);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
