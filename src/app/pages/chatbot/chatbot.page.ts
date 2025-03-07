import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import * as stringSimilarity from 'string-similarity';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, RouterLink],
  providers: [Storage]
})
export class ChatbotPage implements OnInit {
  userMessage: string = '';
  messages: Array<{ sender: string; text: string }> = [];
  symptomConditions: { [key: string]: { condition: string, firstAid: string, specificAdvice?: string } } = {
    "fever": { 
      condition: "Possible condition: Flu or COVID-19", 
      firstAid: "First Aid: Stay hydrated, rest, and take fever-reducing medications if necessary."
    },
    "headache": { 
      condition: "Possible condition: Migraine or Stress", 
      firstAid: "First Aid: Rest in a dark, quiet room, and consider taking pain relief medication."
    },
    "cough": { 
      condition: "Possible condition: Cold or COVID-19", 
      firstAid: "First Aid: Stay hydrated, rest, and use cough suppressants or throat lozenges."
    },
    "fatigue": { 
      condition: "Possible condition: Anemia or Sleep Disorder", 
      firstAid: "First Aid: Rest, stay hydrated, and consider iron supplements if necessary."
    },
    "nausea": { 
      condition: "Possible condition: Food Poisoning or Stomach Flu", 
      firstAid: "First Aid: Drink clear fluids, avoid solid foods, and rest."
    },
    "sore throat": { 
      condition: "Possible condition: Strep Throat or Common Cold", 
      firstAid: "First Aid: Drink warm liquids, use throat lozenges, and rest your voice."
    },
    "runny nose": { 
      condition: "Possible condition: Allergies or Common Cold", 
      firstAid: "First Aid: Stay hydrated, use nasal decongestants, and avoid allergens."
    },
    "chest pain": { 
      condition: "Possible condition: Heart Disease or Anxiety", 
      firstAid: "First Aid: Rest, avoid physical exertion, and seek medical attention if severe.",
      specificAdvice: "For chronic patients, it's essential to regularly check in with your healthcare provider."
    },
    "shortness of breath": { 
      condition: "Possible condition: Asthma or COVID-19", 
      firstAid: "First Aid: Use an inhaler if available, sit upright, and seek medical attention if severe.",
      specificAdvice: "Chronic patients should follow their asthma action plan or consult their healthcare provider."
    },
    "high blood pressure": {
      condition: "Possible condition: Hypertension",
      firstAid: "First Aid: Rest in a calm environment and avoid salt.",
      specificAdvice: "Monitor blood pressure regularly and take prescribed medications."
    },
    "gestational diabetes": {
      condition: "Possible condition: Elevated blood sugar levels during pregnancy",
      firstAid: "First Aid: Follow a healthy diet, stay active, and monitor blood sugar levels.",
      specificAdvice: "Consult your obstetrician regularly to manage your condition."
    },
    "pregnancy nausea": {
      condition: "Possible condition: Morning sickness",
      firstAid: "First Aid: Eat small, frequent meals and stay hydrated.",
      specificAdvice: "Consult your obstetrician if symptoms persist."
    }
  };

  constructor(private storage: Storage) { }

  async ngOnInit(): Promise<void> {
    await this.storage.create();
    this.loadMessages();
    this.messages.push({ sender: 'bot', text: "Hello! How can I assist you today?" });
  }

  async loadMessages() {
    const storedMessages = await this.storage.get('chatMessages');
    if (storedMessages) {
      this.messages = storedMessages;
    }
  }

  async saveMessages() {
    await this.storage.set('chatMessages', this.messages);
  }

  async sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ sender: 'user', text: this.userMessage });

      this.checkGreeting(this.userMessage.trim().toLowerCase()) || this.extractSymptomsFromMessage(this.userMessage.trim().toLowerCase());

      await this.saveMessages();

      this.userMessage = '';
    }
  }

  checkGreeting(message: string) {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon'];

    if (greetings.some(greeting => message.includes(greeting))) {
      this.messages.push({ sender: 'bot', text: "Hi there! How can I help you today?" });
      return true;
    }
    return false;
  }

  extractSymptomsFromMessage(message: string) {
    const possibleSymptoms = Object.keys(this.symptomConditions);
    const bestMatch = stringSimilarity.findBestMatch(message, possibleSymptoms).bestMatch;

    if (bestMatch.rating > 0.5) {
      const condition = this.symptomConditions[bestMatch.target];
      let response = `I'm sorry to hear you're experiencing ${bestMatch.target}. ${condition.condition}. ${condition.firstAid}`;
      if (condition.specificAdvice) {
        response += ` ${condition.specificAdvice}`;
      }
      this.messages.push({ sender: 'bot', text: response });
    } else {
      this.messages.push({ sender: 'bot', text: "I'm sorry, I couldn't identify a symptom from your message." });
    }
  }
}
