import { Component, OnInit, Input } from '@angular/core';
import { expense } from 'src/app/expense';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrls: ['./settle-up.component.scss']
})
export class SettleUpComponent implements OnInit {
  public settleList:any = [];
  @Input() settleUpList: expense[];
  constructor() { }

  ngOnInit() {
  }
}
