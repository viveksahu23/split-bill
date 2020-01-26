import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesComponent } from './expenses.component';
import { Component } from '@angular/core';


@Component({
  selector:'app-header',
  template:'<div>test header</div>'
})
class HeaderComponent {

}
describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesComponent,HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
