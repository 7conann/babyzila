import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-analitics',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CalendarModule, FormsModule],
  templateUrl: './analitics.component.html',
  styleUrls: ['./analitics.component.scss']
})
export class AnaliticsComponent implements OnInit {
  currentDate?: Date;

  ngOnInit(): void {

    this.currentDate = new Date();
    console.log('Data atual:', this.currentDate);
  }
}
