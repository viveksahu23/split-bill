import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatInputModule } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { of, Observable } from 'rxjs';
import { By } from 'protractor';
import { AppService } from 'src/app/app.service';

@Component({
  selector:'app-header',
  template:'<div>test header</div>'
})
class HeaderComponent {

}

@Component({
  selector:'app-settle-up',
  template:'<div>test component</div>'
})
class SettleUpComponent {
  @Input() settleUpList
}
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule
      ],
      declarations: [ HomeComponent, HeaderComponent, SettleUpComponent ],
      providers: [
        {
          provide: ToastrService,
          useValue: {
            success: (heading:string, msg:string,config:{}) => {
              return of(true);
            },
            error: (heading:string, msg:string,config:{}) => {
              return of(new Error);
            }
          },
        },
        {
          provide: AppService,
          useValue: {
            addUser: (name: string) => {
              return of("user added successfully");
            },
            getAllUsers: () => {
              return []
            },
            settleUpList: () => {
              return [{}]
            },
            saveExpense: (desc: string, amount:number, paidBy: string, persons: string[]) => {
              return of("expense added succesfully");
            },
            getSettleUpList: () => {
              return [{}]
            },
            searchPerson:(key:string, exclude:string[]) => {
              return of([]);
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    let expetedList = new SettleUpComponent();
    component.settleUpList = expetedList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the user form', () => {
    let spy = spyOn(component.user,'reset');
    component.resetUserForm();
    expect(spy).toHaveBeenCalled();
  });

  it('should reset the expense form', () => {
    let spy = spyOn(component.expenseFormGroup,'reset');
    component.resetExpenseForm();
    expect(spy).toHaveBeenCalled();
    expect(component.persons).toEqual([]);
  });

  it('should add a person', () => {
    let spy = spyOn(TestBed.get(AppService),'addUser').and.returnValue(of("user added succesfully"));
    let usersSpy = spyOn(component,'getUsers');
    let resetFormSpy = spyOn(component, 'resetUserForm');
    component.user.setValue("TestUser");
    component.addPerson();
    expect(spy).toHaveBeenCalled();
    expect(usersSpy).toHaveBeenCalled();
    expect(resetFormSpy).toHaveBeenCalled();
  });

  it('should add a expense', () => {
    component.expenseFormGroup.setValue({
      "description":"test description",
      "amount": 100,
      "paidBy": "Vivek",
      "splitAmong": []
    })
    component.persons = ["Mohit", "Pankaj"];
    let spy = spyOn(TestBed.get(AppService),'saveExpense').and.returnValue(of("expense added succesfully"));
    let listSpy = spyOn(component,'getSettleUpList');
    let resetFormSpy = spyOn(component, 'resetExpenseForm');
    component.addExpense();
    expect(spy).toHaveBeenCalled();
    expect(listSpy).toHaveBeenCalled();
    expect(resetFormSpy).toHaveBeenCalled();
  });

});
