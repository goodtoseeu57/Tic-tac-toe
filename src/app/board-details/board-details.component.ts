import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {
  @Input() value: 'X'| 'O';

  constructor() { }

  ngOnInit() {
  }

}
