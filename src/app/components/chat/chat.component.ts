import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Doctor } from 'src/app/types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class ChatComponent  implements OnInit {

  @Input() doc !: Doctor
  @Output() openIt = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {}

  onDoctorClick(): void {
    this.openIt.emit(this.doc.id);
  }
}
