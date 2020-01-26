import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService]
    });
    service = TestBed.get(AppService);
  });

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    expect(service).toBeTruthy();
  });

  it('should save an expense', () => {
    const description = "Test Expense";
    const amount = 600;
    const paidBy = "vivek";
    const users = ["vivek","mohit", "pankaj"];
    const persons = ["mohit", "pankaj"];

    users.forEach((person) => {
      service.addUser(person);
    })
    service.saveExpense(description,amount, paidBy, persons);

    const settleUpList = service.getSettleUpList();

    expect(settleUpList.length).toEqual(2);

    expect(settleUpList[0]['to']).toBe('vivek');
    expect(settleUpList[0]['amount']).toBe(200);
    expect(settleUpList[0]['from']).toBe('mohit');
    expect(settleUpList[0]['to']).toBe('vivek');
    expect(settleUpList[0]['amount']).toBe(200);

    expect(settleUpList[1]['from']).toBe('pankaj');
    expect(settleUpList[1]['to']).toBe('vivek');
    expect(settleUpList[1]['amount']).toBe(200);

  });

  it('should get all users', () => {
    const users = ["vivek","mohit", "pankaj"];
    users.forEach((user) => {
      service.addUser(user);
    })

    expect(service.getAllUsers().length).toEqual(3);
  })

  it('should throw an error if user already exists', () => {
    service.addUser("vivek");
    const duplicateUser = service.addUser("vivek");
    duplicateUser.subscribe((res) => {
      expect(duplicateUser).toThrowError('User already Exists');
    })
  })

  it('should search a user', () => {
    const people = ['vivek', 'mohit', 'pankaj'];
    people.forEach(person => service.addUser(person));

    service.searchPerson('m', ['vivek']).subscribe(transactions => {
      expect(transactions.length).toEqual(1);
      expect(transactions[0]).toEqual('mohit');
    });
  })

  it('should return an empty array if search string is blank', () => {
    const people = ['vivek', 'mohit', 'pankaj'];
    people.forEach(person => service.addUser(person));

    service.searchPerson('', ['vivek']).subscribe(transactions => {
      expect(transactions.length).toEqual(0);
    });
    
  });

});
