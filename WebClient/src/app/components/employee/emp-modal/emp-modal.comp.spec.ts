import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpModalComp } from './emp-modal.comp';

describe('EmpModalComp', () => {
  let component: EmpModalComp;
  let fixture: ComponentFixture<EmpModalComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpModalComp]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpModalComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create employee modal component', () => {
    expect(component).toBeTruthy();
  });
});
