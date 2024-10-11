import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent {
  sidebarVisible: boolean = false;

  constructor() { }

  ngOnInit() {

  }
}
