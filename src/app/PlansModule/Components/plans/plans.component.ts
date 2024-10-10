import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { SidebarService } from '../../../../shared/Service/sidebar.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent {
  sidebarVisible: boolean = false;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.sidebarVisible$.subscribe(visible => {
      this.sidebarVisible = visible;
    });
  }
}
