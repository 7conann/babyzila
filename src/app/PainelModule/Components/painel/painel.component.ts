import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { SidebarService } from '../../../../shared/Service/sidebar.service';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.scss'
})
export class PainelComponent {
  sidebarVisible: boolean = false;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.sidebarVisible$.subscribe(visible => {
      this.sidebarVisible = visible;
    });
  }
}
