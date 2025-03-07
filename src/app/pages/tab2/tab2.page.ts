import { Component, OnInit } from '@angular/core';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { ChatComponent } from '../../components/chat/chat.component';
import { Doctor } from 'src/app/types';
import { getDoctors } from 'src/app/api/userApi'; // Import the getDoctors function


import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, ExploreContainerComponent, ChatComponent, FormsModule], // Add FormsModule
})
export class Tab2Page implements OnInit {
  doctors: Doctor[] = [];
  filtered: Doctor[] = [];
  searchTerm: string = ''; // Add searchTerm variable

  constructor() {}

  async ngOnInit() {
    await this.loadDoctors();
    this.filteredDocs('all');
  }

  async loadDoctors() {
    try {
      const jwt = localStorage.getItem('jwt-token');
      const doctors = await getDoctors(jwt);
      if (doctors) {
        this.doctors = doctors.map(user => ({
          id: user.id ? parseInt(user.id, 10) : 0,
          name: user.name,
          available: user.available,
          speciality: user.speciality,
          image: user.image,
        }));
        this.filteredDocs('all');
      } else {
        console.error('Failed to load doctors');
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
    }
  }

  filteredDocs(val: string) {
    if (val === 'recent') {
      this.filtered = this.doctors.filter(doc => doc.available);
    } else {
      this.filtered = this.doctors.filter(doc => 
        doc.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return this.filtered;
  }
}
