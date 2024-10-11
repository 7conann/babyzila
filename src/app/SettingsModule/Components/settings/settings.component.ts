import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  sidebarVisible: boolean = false;

  constructor() { }

  ngOnInit() {

  }
}
