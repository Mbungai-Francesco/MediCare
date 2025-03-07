import { Component } from '@angular/core';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { ChatComponent } from '../../components/chat/chat.component';
import { Doctor } from 'src/app/types';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, ExploreContainerComponent, ChatComponent],
})
export class Tab2Page {

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

  filtered: Doctor[] = []

  filteredDocs(val : string){
    if(val == 'recent') this.filtered = this.doctors.filter((doc) => doc.available)
    // else if(val == 'all') this.filtered = this.doctors.filter((doc) => !doc.available)
    else this.filtered = this.doctors

    return this.filtered
  }

  constructor() {
    this.filteredDocs('all')
  }
}
