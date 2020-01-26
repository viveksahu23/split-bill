import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { MatChipInputEvent} from '@angular/material/chips';
import { debounceTime, switchMap} from 'rxjs/operators';
import { expense } from './../../expense';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]+')]);
  public users: string[] = [];
  public newExpense: expense;
  public settleUpList: any;
  public expenseFormGroup = new FormGroup({
    description: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]*')]),
    amount: new FormControl('', Validators.required),
    paidBy: new FormControl('', Validators.required),
    splitAmong: new FormControl({value:'',disabled:true})
  })

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  filteredPersons: any[];
  persons: string[] = [];
  allPersons: string[] = [...this.persons];

  @ViewChild('personInput', {static: false}) personInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(private appService: AppService, private toastr: ToastrService) { 

  }

  ngOnInit() {
    this.getUsers();
    this.getSettleUpList();
    this.settleUpList = this.appService.getSettleUpList();
    this.expenseFormGroup
      .get('splitAmong')
      .valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.appService.searchPerson(value, [this.expenseFormGroup
          .get('paidBy').value, ...this.persons])
        )
      ).subscribe((users: any) => {
        this.filteredPersons = users;
      });
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.persons.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.expenseFormGroup.controls['splitAmong'].setValue(null);
    }
  }

  remove(person: string): void {
    const index = this.persons.indexOf(person);

    if (index >= 0) {
      this.persons.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.persons.push(event.option.viewValue);
    this.personInput.nativeElement.value = '';
    this.expenseFormGroup.controls['splitAmong'].setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allPersons.filter(person => person.toLowerCase().indexOf(filterValue) === 0);
  }

  addPerson(): void{
    this.appService.addUser(this.user.value).subscribe(
      res => {
        this.toastr.success(res,'Success',{timeOut: 1000});
        this.resetUserForm();
        this.getUsers();
      },
      err => {
        this.toastr.error(err,'Error',{timeOut: 1000});
      }
    );
  }

  getUsers(){
    this.users = this.appService.getAllUsers();
  }

  getSettleUpList(){
    this.settleUpList = this.appService.getSettleUpList();
  }

  addExpense(): void{
    const expenseForm = this.expenseFormGroup.value;
    this.appService.saveExpense(expenseForm.description, expenseForm.amount, expenseForm.paidBy, this.persons).subscribe((res) => {
        this.resetExpenseForm();
        this.toastr.success(res,'Success',{timeOut: 1000});
        this.getSettleUpList();
    })  
  }

  resetUserForm(): void{
    this.user.reset();
  }

  resetExpenseForm(): void{
    this.expenseFormGroup.reset();
    this.expenseFormGroup.controls['splitAmong'].disable();
    this.persons = [];
  }

  enableSplitAmong(e:MatSelectChange){
    this.persons = [];
    this.expenseFormGroup.controls['splitAmong'].enable();
  }

}
