import { TestBed } from '@angular/core/testing';
import { CalcService } from './calc.service';
import { SharedService } from './shared.service';

describe('CalcService', () => {
  let calc: CalcService;
  let shared: SharedService;

  beforeEach(() => {
    shared = jasmine.createSpyObj('SharedService', ['mySharedFunction']);
    TestBed.configureTestingModule({
      providers: [
        CalcService,
        {
          provide: SharedService,
          useValue: shared,
        },
      ],
    });
    calc = TestBed.inject(CalcService);
    shared = TestBed.inject(SharedService);
  });

  it('should multiply two numbers', () => {
    // const shared = new SharedService();
    // const calc = new CalcService(shared);
    const result = calc.multiply(2, 2);
    expect(result).toEqual(4);
  });

  it('should add two numbers', () => {
    // const shared = new SharedService();
    // const calc = new CalcService(shared);
    const result = calc.multiply(2, 2);
    expect(result).toEqual(4);
  });

  // spy on injected dependency
  // it('should call mySharedFunction', () => {
  //   const shared = new SharedService();
  //   spyOn(shared, 'mySharedFunction');
  //   const calc = new CalcService(shared);
  //   const result = calc.multiply(3, 3);
  //   expect(shared.mySharedFunction).toHaveBeenCalled();
  // });

  it('should call mysharedfunction withou running constructore', () => {
    // const shared = jasmine.createSpyObj('SharedService', ['mySharedFunction']);
    // const calc = new CalcService(shared);
    const result = calc.multiply(5, 5);
    expect(result).toEqual(25);
  });
});
