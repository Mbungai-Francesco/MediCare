import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ChatComponent } from '../../components/chat/chat.component';
import { Doctor } from 'src/app/types';
import { getDoctors } from 'src/app/api/userApi'; // Import the getDoctors function
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, ChatComponent, CommonModule, FormsModule],
})
export class Tab2Page implements OnInit {
  showBarcode = false;
  loading!: HTMLIonLoadingElement;
  @ViewChild('messageToaster') messageToaster!: ElementRef;

  doctors: Doctor[] = [];
  filtered: Doctor[] = [];
  searchQuery: string = '';

  messageStatus!: boolean;
  message = '';

  date = new Date();

  doc!: Doctor;

  constructor(
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.loadDoctors();
    this.loadingCtrl.create({}).then((res) => {
      this.loading = res;
    });
  }

  loadDoctors() {
    const jwt = localStorage.getItem('jwt-token');
    this.showLoading('Logging in', true);
    getDoctors().then((doctors) => {
      if (doctors) {
        console.log(doctors);
        this.showLoading('Logging in', false);
        this.doctors = doctors.map((user) => ({
          id: user.id ? parseInt(user.id, 10) : 0,
          name: user.name,
          available: user.available,
          speciality: user.speciality,
          image: user.image,
        }));
        localStorage.setItem('doctors', JSON.stringify(this.doctors)); // Store locally
        this.filteredDocs('all');
      } else {
        console.error('Failed to load doctors');
        console.error('Error loading doctors:');
      this.loadDoctorsFromLocalStorage(); // Load from local storage in case of error
      }
    });

    
    // try {
    // } catch (error) {
    //   console.error('Error loading doctors:', error);
    //   this.loadDoctorsFromLocalStorage(); // Load from local storage in case of error
    // }
  }

  async showLoading(mes: string, openOrClose: boolean) {
    this.loading.message = mes;
    this.loading.isOpen = openOrClose;
    // this.loading.present();
  }

  loadDoctorsFromLocalStorage() {
    const storedDoctors = localStorage.getItem('doctors');
    if (storedDoctors) {
      this.doctors = JSON.parse(storedDoctors);
      this.filteredDocs('all');
    } else {
      console.error('No doctors found in local storage');
    }
  }

  filteredDocs(val: string) {
    let results =
      val === 'recent'
        ? this.doctors.filter((doc) => doc.available)
        : [...this.doctors];

    // Apply search filter
    if (this.searchQuery) {
      results = results.filter(
        (doc) =>
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

  openModal(val: number) {
    this.doc = this.doctors.find((doc) => doc.id === val) || ({} as Doctor);
    this.showBarcode = this.doc.available;
  }

  cancel() {
    this.showBarcode = false;
  }

  reserve() {
    console.log(this.date);
    this.showBarcode = false;
    this.messageStatus = true;
    this.message = 'Scheduled successfully';
    this.messageToaster.nativeElement.click();
  }
}
