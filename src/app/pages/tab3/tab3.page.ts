import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { Doctor, Record, User } from 'src/app/types';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from "../../components/chat/chat.component";
import { Storage } from '@ionic/storage-angular';
import { RecordComponent } from "../../components/record/record.component";
import { RecordService } from 'src/app/services/record/record.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonicModule, ExploreContainerComponent, CommonModule, FormsModule, ChatComponent, RecordComponent],
  providers: [Storage],
})
export class Tab3Page {
  showBarcode = false;
    @ViewChild('messageToaster') messageToaster!: ElementRef;
  
    records: Record[] = [];
    filtered: Record[] = [];
    searchQuery: string = '';

    patient !: {
      phoneNumber : number;
      name : string;
      email ?: string
    }
  
    messageStatus!: boolean;
    message = '';
  
    date = new Date();
  
    rec!: Record;
  
    constructor(
      private storage: Storage,
      private recordService : RecordService
    ) {}
  
    ngOnInit() {
      this.storage.create().then(() =>{
        this.getPatient()
      })
    }

    getPatient() {
      this.storage.get('user').then((user)=>{
        this.patient = user;
        console.log(this.patient);
        this.loadRecords()
      })
    }
  
    loadRecords() {
      try {
        const jwt = localStorage.getItem('jwt-token');
        this.records = this.recordService.getRecords()
        console.log(this.records);
        
        // .((recs) =>{
        //   if(recs){
        //     this.records = recs.map((val) => ({
        //       diagnosis: val.diagnosis,
        //       phoneNumber: val.phoneNumber,
        //       prescription: val.prescription,
        //     }));
        //   } else {
        //     console.error('Failed to load records');
        //   }
        // })
      } catch (error) {
        console.error('Error loading records:', error);
      }
    }
  
    // filteredDocs(val: string) {
    //   let results =
    //     val === 'recent'
    //       ? this.records.filter((doc) => doc.available)
    //       : [...this.records];
  
    //   // Apply search filter
    //   if (this.searchQuery) {
    //     results = results.filter(
    //       (doc) =>
    //         doc.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    //         doc.speciality.toLowerCase().includes(this.searchQuery.toLowerCase())
    //     );
    //   }
  
    //   this.filtered = results;
    // }
  
    // filterDoctors() {
    //   this.filteredDocs('all'); // Trigger filtering on search input
    // }
  
    trackById(index: number, doc: Doctor) {
      return doc.id; // Helps Angular optimize rendering
    }
  
    // openModal(val: number) {
    //   this.doc = this.doctors.find((doc) => doc.id === val) || ({} as Doctor);
    //   this.showBarcode = this.doc.available;
    // }
  
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
