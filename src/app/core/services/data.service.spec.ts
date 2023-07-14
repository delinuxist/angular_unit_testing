import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DataService } from './data.service';
import { USERS } from '../mock-data/users';

describe('DataService', () => {
  let service: DataService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    service.getAllUsers().subscribe((users: any) => {
      expect(users).toBeTruthy();
      expect(users.length).toEqual(3);
    });
    const mockReq = testingController.expectOne('api/users');
    mockReq.flush(Object.values(USERS));
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should return one user', () => {
    service.getUserById(1).subscribe((user: any) => {
      expect(user).toBeTruthy();
      expect(user.name).toEqual('Harry Potter');
    });
    const mockReq = testingController.expectOne('api/users/1');
    mockReq.flush(USERS[1]);
  });

  afterEach(() => {
    testingController.verify();
  });

  it('should update user', () => {
    service.updateUser(1, { age: 28 }).subscribe((user: any) => {
      expect(user.age).toEqual(28);
    });
    const mockReq = testingController.expectOne('api/users/1');
    expect(mockReq.request.method).toEqual('PUT');
    const modified = USERS[1];
    modified.age = 28;
    expect(mockReq.request.body.age).toEqual(28);
    mockReq.flush(modified);
  });
});
