import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpListComp } from './emp-list.comp';

describe('EmpListComp', () => {
  let component: EmpListComp;
  let fixture: ComponentFixture<EmpListComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpListComp]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpListComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create employee list component', () => {
    expect(component).toBeTruthy();
  });
});
