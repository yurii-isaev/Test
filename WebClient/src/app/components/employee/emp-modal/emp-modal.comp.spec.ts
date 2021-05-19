import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpModalComp } from './emp-modal.comp';
import { SharedService } from '../../../services/shared/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IEmployee } from '../emp.comp';

describe('EmpModalComp', () => {
  let component: EmpModalComp;
  let fixture: ComponentFixture<EmpModalComp>;
  let service: SharedService;
  let mockList: string[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpModalComp],
      imports: [HttpClientModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpModalComp);
    component = fixture.componentInstance;
    component.emp = <IEmployee>{employeeId: 1};
    service = fixture.debugElement.injector.get<SharedService>(SharedService as any);
    mockList = ['test'];
    fixture.detectChanges();
  });

  it('should create employee modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should call shared service when load department list', () => {
    const spy = spyOn(service, 'getAllDepartmentNamesFromDB').and.returnValue(of(mockList));
    component.loadDepartmentList();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set department list value when load department list', () => {
    spyOn(service, 'getAllDepartmentNamesFromDB').and.returnValue(of(mockList));
    component.loadDepartmentList();
    expect(component.departmentList).toEqual(mockList);
  });

  it('should call shared service when add employee', () => {
    const spy = spyOn(service, 'addEmployeeToDB').and.returnValue(of(mockList[0]));
    component.addEmployee();
    expect(spy.calls.any()).toBeTruthy();
  });
});
