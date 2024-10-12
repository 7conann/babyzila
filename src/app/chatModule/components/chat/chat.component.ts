import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,NavbarComponent], // Adiciona o CommonModule para usar ngClass
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages = [
    { sender: 'user', text: 'Olá!' },
    { sender: 'bot', text: 'Oi! Como posso ajudar?' }
  ];

  get hasBotMessages(): boolean {
    return this.messages.some(message => message.sender === 'bot');
  }

  sendMessage() {
    const inputElement = document.getElementById('user-input') as HTMLInputElement;
    const messageText = inputElement.value.trim();
    if (messageText) {
      this.messages.push({ text: messageText, sender: 'user' });
      inputElement.value = '';
      this.scrollToBottom();
      this.getBotResponse(messageText);
    }
  }

  getBotResponse(userMessage: string) {
    // Simulação de resposta do bot
    setTimeout(() => {
      this.messages.push({ text: 'Esta é uma resposta simulada do bot.', sender: 'bot' });
      this.scrollToBottom();
    }, 1000);
  }

  scrollToBottom() {
    const chatMessagesElement = document.getElementById('chat-messages');
    if (chatMessagesElement) {
      chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }
  }
}
