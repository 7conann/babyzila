import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { AuthService } from '../../../../shared/Service/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ButtonModule], // Adiciona o CommonModule e ButtonModule para usar ngClass e PrimeNG
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: { sender: string, text: string }[] = [];
  userQuestions: string[] = [];
  aiResponses: string[] = [];
  canSendMessageFlag = true;
  showWelcomeMessage = true;
  userID: string = '';
  planID: string = '';

  constructor(private changeDetectorRef: ChangeDetectorRef, private auth: AuthService) {}

  async ngOnInit() {
    this.setUserIDFromToken();
    if (this.userID) {
      try {
        const userData = await this.auth.getUserById(this.userID);
        console.log('User data:', userData);
        if (userData) {
          this.userID = userData.id;
          this.planID = userData.plan_id ?? '';
          const planData = await this.auth.getPlanById(this.planID);
          if (planData) {
            // this.userPlanLimit = planData.message_limit;
            // this.loadMessagesSentToday();
          }
        }
      } catch (error) {
        console.error('Error fetching user or plan data:', error);
      }
    }
  }

  setUserIDFromToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.auth.decodeToken(token);
      if (decodedToken && decodedToken.id) {
        this.userID = decodedToken.id;
      }
    }
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.canSendMessageFlag && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage() {
    const inputElement = document.getElementById('userInput') as HTMLTextAreaElement;
    const messageText = inputElement.value.trim();

    if (!messageText) return;

    this.canSendMessageFlag = false;
    inputElement.value = '';
    this.showWelcomeMessage = false;

    this.messages.push({ text: messageText, sender: 'user' });
    this.userQuestions.push(messageText);

    this.changeDetectorRef.detectChanges();
    this.scrollToBottom();

    fetch('https://webhook.workez.online/webhook/fe8ee5ca-1a13-449f-bc2c-54fca1795da6', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userQuestions: this.userQuestions,
        aiResponses: this.aiResponses
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data:', data);
      const botText = this.extractBotResponse(data);
      this.aiResponses.push(botText);
      console.log('Bot responses:', this.aiResponses);
      this.messages.push({ text: botText, sender: 'bot' });
      console.log('Messages:', this.messages);
      this.changeDetectorRef.detectChanges();
      this.scrollToBottom();
      this.canSendMessageFlag = true;
    })
    .catch(error => {
      console.error('Erro:', error);
      this.canSendMessageFlag = true;
    });
  }

  createLoadingDiv() {
    const chatArea = document.getElementById('chatArea');
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('bot-response');
    loadingDiv.innerHTML = `
      <div class="icon"></div>
      <div class="loading">
        <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      </div>
    `;
    chatArea?.appendChild(loadingDiv);
    return loadingDiv;
  }

  extractBotResponse(data: any): string {
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content;
    } else if (data.message && data.message.content) {
      return data.message.content;
    } else {
      return "Texto não disponível";
    }
  }

  scrollToBottom() {
    const chatMessagesElement = document.getElementById('chatArea');
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }
}
