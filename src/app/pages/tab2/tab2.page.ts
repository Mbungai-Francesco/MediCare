import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChatComponent } from '../../components/chat/chat.component';
import { Doctor } from 'src/app/types';
import { getDoctors } from 'src/app/api/userApi'; // Import the getDoctors function

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, ChatComponent],
})
export class Tab2Page implements OnInit {
  doctors: Doctor[] = [];
  filtered: Doctor[] = [];
  searchQuery: string = '';

  constructor() {}

  async ngOnInit() {
    await this.loadDoctors();
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
    let results = val === 'recent' ? this.doctors.filter(doc => doc.available) : [...this.doctors];
    
    // Apply search filter
    if (this.searchQuery.trim()) {
      results = results.filter(doc =>
        doc.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    
    this.filtered = results;
  }

  filterDoctors() {
    this.filteredDocs('all'); // Trigger filtering on search input
  }

  trackById(index: number, doc: Doctor) {
    return doc.id; // Helps Angular optimize rendering
  }
}
