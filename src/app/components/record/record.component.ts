import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Record } from 'src/app/types';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  standalone: true,
  imports: [RouterLink]
})
export class RecordComponent  implements OnInit {
  @Input() rec !: Record

  constructor() { }

  ngOnInit() {}

}
