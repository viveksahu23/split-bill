import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  expenses: any[];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.expenses = this.appService.getExpenses();
  }

}
