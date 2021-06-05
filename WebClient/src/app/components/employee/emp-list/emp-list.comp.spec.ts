import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpListComp } from './emp-list.comp';
import { SharedService } from '../../../services/shared/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IEmployee } from '../emp.comp';

describe('EmpListComp', () => {
  let component: EmpListComp;
  let fixture: ComponentFixture<EmpListComp>;
  let service: SharedService;
  let mockList: IEmployee[];
  let mock: IEmployee;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpListComp],
      imports: [HttpClientModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpListComp);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get<SharedService>(SharedService as any);
    mockList = [];
    mock = <IEmployee>{employeeId: 1, employeeName: 'test'};
    fixture.detectChanges();
  });

  it('should create employee list component', () => {
    expect(component).toBeTruthy();
  });

  it('should call shared service when update employee list', () => {
    const spy = spyOn(service, 'getEmployeeListFromDB').and.returnValue(of(mockList));
    component.updateEmployeeList();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set employee list value when update employee list', () => {
    spyOn(service, 'getEmployeeListFromDB').and.returnValue(of(mockList));
    component.updateEmployeeList();
    expect(component.employeeList).toEqual(mockList);
  });

  it('should call confirm window when show confirm', () => {
    spyOn(window, 'confirm');
    component.showConfirmDeleteEmployee(mock);
    expect(window.confirm).toHaveBeenCalled();
  });

  it('should call shared service when delete employee', () => {
    const spy = spyOn(service, 'deleteEmployeeFromDB').and.returnValue(of(mock.employeeName));
    component.deleteEmployee(mock);
    expect(spy.calls.any()).toBeTruthy();
  });
});
