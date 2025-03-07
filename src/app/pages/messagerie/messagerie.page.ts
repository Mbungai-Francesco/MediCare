import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Doctor } from 'src/app/types';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.page.html',
  styleUrls: ['./messagerie.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class MessageriePage implements OnInit {

  doc !: Doctor

  doctors: Doctor[] = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@medclinic.com',
        phone: '(555) 123-4567',
        address: '123 Medical Center Ave, Suite 101',
        speciality: 'Cardiologist',
        available: true,
        image: 'assets/images/doctor-1.jpg',
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        email: 'm.chen@medclinic.com',
        phone: '(555) 234-5678',
        address: '456 Health Parkway, Suite 202',
        speciality: 'Pediatrician',
        available: true,
        image: 'assets/images/doctor-2.jpg',
      },
      {
        id: 3,
        name: 'Dr. Emily Rodriguez',
        email: 'e.rodriguez@medclinic.com',
        phone: '(555) 345-6789',
        address: '789 Wellness Road',
        speciality: 'Dermatologist',
        available: false,
        image: 'assets/images/doctor-3.jpg',
      },
      {
        id: 4,
        name: 'Dr. James Wilson',
        email: 'j.wilson@medclinic.com',
        phone: '(555) 456-7890',
        address: '321 Care Boulevard',
        speciality: 'Neurologist',
        available: true,
        image: 'assets/images/doctor-4.jpg',
      },
      {
        id: 5,
        name: 'Dr. Lisa Patel',
        email: 'l.patel@medclinic.com',
        phone: '(555) 567-8901',
        address: '654 Hospital Drive',
        speciality: 'Orthopedist',
        available: true,
        image: 'assets/images/doctor-5.jpg',
      },
      {
        id: 6,
        name: 'Dr. Robert Kim',
        email: 'r.kim@medclinic.com',
        phone: '(555) 678-9012',
        address: '987 Medical Park Road',
        speciality: 'Psychiatrist',
        available: false,
        image: 'assets/images/doctor-6.jpg',
      },
      {
        id: 7,
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@medclinic.com',
        phone: '(555) 123-4567',
        address: '123 Medical Center Ave, Suite 101',
        speciality: 'Cardiologist',
        available: true,
        image: 'assets/images/doctor-1.jpg',
      },
      {
        id: 8,
        name: 'Dr. Michael Chen',
        email: 'm.chen@medclinic.com',
        phone: '(555) 234-5678',
        address: '456 Health Parkway, Suite 202',
        speciality: 'Pediatrician',
        available: true,
        image: 'assets/images/doctor-2.jpg',
      },
      {
        id: 9,
        name: 'Dr. Emily Rodriguez',
        email: 'e.rodriguez@medclinic.com',
        phone: '(555) 345-6789',
        address: '789 Wellness Road',
        speciality: 'Dermatologist',
        available: false,
        image: 'assets/images/doctor-3.jpg',
      },
      {
        id: 10,
        name: 'Dr. James Wilson',
        email: 'j.wilson@medclinic.com',
        phone: '(555) 456-7890',
        address: '321 Care Boulevard',
        speciality: 'Neurologist',
        available: true,
        image: 'assets/images/doctor-4.jpg',
      },
      {
        id: 11,
        name: 'Dr. Lisa Patel',
        email: 'l.patel@medclinic.com',
        phone: '(555) 567-8901',
        address: '654 Hospital Drive',
        speciality: 'Orthopedist',
        available: true,
        image: 'assets/images/doctor-5.jpg',
      },
      {
        id: 12,
        name: 'Dr. Robert Kim',
        email: 'r.kim@medclinic.com',
        phone: '(555) 678-9012',
        address: '987 Medical Park Road',
        speciality: 'Psychiatrist',
        available: false,
        image: 'assets/images/doctor-6.jpg',
      },
  ];

  id = 0

  constructor(
    private route : ActivatedRoute
  ) { 
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      console.log(this.id);
      this.doc = this.doctors[--this.id]
    })
  }

  ngOnInit() {
  }

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
  
    newMessage = '';
  
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
