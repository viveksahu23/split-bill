import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { expense, users } from './expense';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public expensesList: any[] = [];
  public newExpense: expense;
  private users: users = {};
  constructor() { }

  saveExpense(description: any, amount: any, paidBy: any, persons: string[]) {
    this.setExpensesList(description, amount, paidBy, persons);
    const share = Number((parseInt(amount) / (persons.length + 1)).toFixed(2));
    persons.forEach((person) => {
      this.splitExpenses(paidBy, share, person);
    })
    console.log(this.users);
    return of('Expense Added Successfully');  

  }

  splitExpenses(paidBy: string, share: number, person: string) {
    this.users[person].owes[paidBy] = this.users[person].owes[paidBy] || 0;
    this.users[person].owes[paidBy] += share;

    this.users[paidBy].owes[person] = this.users[paidBy].owes[person] || 0;
    this.users[paidBy].owes[person] -= share;
  }

  addUser(name): Observable<string>{
    name = name.toLowerCase();
    if (this.users[name]) {
      return throwError('User already Exists');
    }
    this.users[name] = {owes:{}};
    return of('User Added Successfully');
  }

  getAllUsers(): any[] {
    return Object.keys(this.users);
  }
  
  searchPerson(str: string, excludePeople?: string[]) {
    if (!str) {
      return of([]);
    }
    str = str.toLowerCase();
    excludePeople = excludePeople || [];
    return of(Object.keys(this.users)).pipe(
      map(people => people.filter(person => {
        return person.toLowerCase().startsWith(str) && !excludePeople.some(excludePerson => {
          return excludePerson.trim().toLowerCase() === person.toLowerCase();
        });
      }))
    );
  }

  getSettleUpList(){
    let list: any[] = [];
    for(const key in this.users){
      Object.values(this.users[key]).forEach((item) => {
        for(const prop in item){
          if(item[prop] > 0){
            list.push({
              'from': key,
              'to': prop,
              'amount': item[prop]
            })
          }
        }
      })
    }

    return list;

  }

  setExpensesList(description: any, amount: any, paidBy: any, persons: string[]){
    this.newExpense = new expense();
    this.newExpense.description = description;
    this.newExpense.amount = amount;
    this.newExpense.paidBy = paidBy;
    this.newExpense.splitAmong = persons.join(', ');
    this.expensesList.unshift(this.newExpense);
  }

  getExpenses(){
    return this.expensesList;
  }
}
