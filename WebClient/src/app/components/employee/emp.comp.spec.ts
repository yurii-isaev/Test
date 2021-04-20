import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpComp } from './emp.comp';

describe('EmpComp', () => {
  let component: EmpComp;
  let fixture: ComponentFixture<EmpComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpComp]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create employee component', () => {
    expect(component).toBeTruthy();
  });
});
