import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { AuthService } from '../../../../shared/Service/auth.service'; // Importe o AuthService para gerenciar o usuário
import { NgIf } from '@angular/common';
import { ToastComponent } from '../../../../shared/toast/toast.component';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, NgIf, ToastComponent],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  sidebarVisible: boolean = false;
  @ViewChild(ToastComponent) toast!: ToastComponent;
  userID: string = ''; // Inicializar como string vazia
  planID: string = ''; // Inicializar como string vazia para armazenar o plan_id do usuário
  userPlan: string = ''; // Inicializar como string vazia para armazenar o nome do plano do usuário

  constructor(private auth: AuthService) { }

  async ngOnInit() {
    this.setUserIDFromToken();
    if (this.userID) {
      try {
        const userData = await this.auth.getUserById(this.userID);
        console.log('User data:', userData);
        if (userData) {
          this.userID = userData.id;
          this.planID = userData.plan_id ?? ''; // Armazenar o plan_id do usuário
          console.log('User ID:', this.userID);
          console.log('Plan ID:', this.planID);
          // Buscar os dados do plano usando o plan_id
          const planData = await this.auth.getPlanById(this.planID);
          console.log('Plan data:', planData);
          if (planData) {
            this.userPlan = planData.name; // Armazenar o nome do plano do usuário
          }
        }
      } catch (error) {
        console.error('Error fetching user or plan data:', error);
      }
    }
  }

  setUserIDFromToken(): void {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    if (token) {
      const decodedToken = this.auth.decodeToken(token);
      console.log('Decoded token:', decodedToken);
      if (decodedToken && decodedToken.id) {
        this.userID = decodedToken.id;
      }
    }
  }

  showToast(message: string, type: 'success' | 'error' | 'info') {
    this.toast.message = message;
    this.toast.type = type;
    this.toast.show = true;
    setTimeout(() => this.toast.hideToast(), 3000);
  }
}
