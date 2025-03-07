import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Doctor } from 'src/app/types';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getDoctors } from 'src/app/api/userApi';  // Import your API function

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.page.html',
  styleUrls: ['./messagerie.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class MessageriePage implements OnInit {
  doc!: Doctor;
  doctors: Doctor[] = [];
  id = 0;
  newMessage = '';
  messages = [
    { sender: 'other', text: 'Hiiii\nHow you doing', time: '10:37' },
    { sender: 'me', text: 'Fine fine and you..?', time: '11:12' },
    { sender: 'other', text: 'Same here, 🤗', time: '11:43' },
    { sender: 'me', text: 'Great ohh', time: '11:46' },
    { sender: 'me', text: 'please I wanted to know.. bout the Yaoundé Hack you guys attended..', time: '11:47' },
    { sender: 'me', text: 'Like what was the problem statement they gave you guys..', time: '11:47' },
    { sender: 'me', text: 'And what solution did you guys provide..?', time: '11:47' },
    { sender: 'other', text: 'Hummm lemme remember', time: '14:09' }
  ];

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      console.log(this.id);
      this.loadDoctor();
    });
  }

  ngOnInit() {
    this.loadDoctors();
  }

  async loadDoctors() {
    const jwt = localStorage.getItem('jwt-token');  // Replace with your JWT logic if needed
    const users = await getDoctors() || [];
    this.doctors = users.map(user => ({
      ...user,
      id: Number(user.id)
    })) as Doctor[];
    if (this.id) {
      this.loadDoctor();
    }
  }

  loadDoctor() {
    this.doc = this.doctors.find(doc => doc.id === this.id) || {} as Doctor;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        sender: 'me',
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.newMessage = '';
    }
  }
}
