import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { AuthService } from '../../../../shared/Service/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ CommonModule, NavbarComponent], // Adiciona o CommonModule para usar ngClass
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: { sender: string, text: string }[] = [];
  userQuestions: string[] = [];
  aiResponses: string[] = [];
  canSendMessageFlag = true;
  showWelcomeMessage = true;
  userPlanLimit: number = 0;
  messagesSentToday: number = 0;
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
            this.userPlanLimit = planData.message_limit;
            this.loadMessagesSentToday();
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

  canSendMessage(): boolean {
    return this.messagesSentToday < this.userPlanLimit;
  }

  loadMessagesSentToday(): void {
    const today = new Date().toISOString().split('T')[0];
    const storedData = localStorage.getItem(`messagesSent_${this.userID}_${today}`);
    this.messagesSentToday = storedData ? parseInt(storedData, 10) : 0;
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.canSendMessage() && !event.shiftKey) {
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

    const loadingDiv = this.createLoadingDiv();
    this.canSendMessageFlag = false;

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
      const botText = this.extractBotResponse(data);
      this.aiResponses.push(botText);
      this.messages.push({ text: botText, sender: 'bot' });
      this.changeDetectorRef.detectChanges();
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  // Função auxiliar para criar o div de loading
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

  // Função para extrair a resposta da IA
  extractBotResponse(data: any): string {
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content;
    } else if (data.message && data.message.content) {
      return data.message.content;
    } else {
      return "Texto não disponível";
    }
  }

  saveMessagesSentToday(): void {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`messagesSent_${this.userID}_${today}`, this.messagesSentToday.toString());
  }

  scrollToBottom() {
    const chatMessagesElement = document.getElementById('chat-messages');
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }
}
