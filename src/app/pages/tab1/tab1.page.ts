import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { RouterLink } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule, ExploreContainerComponent, RouterLink],
  providers: [Storage],
})
export class Tab1Page {
  constructor(private storage: Storage) {}

  ngOnInit() {
    this.storage.create()
  } 

  clearUser() {
    this.storage.set('user', null).then(()=>{
      console.log('cleared');
      
    })
  }
}
