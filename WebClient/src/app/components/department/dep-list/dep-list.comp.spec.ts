import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DepListComp } from './dep-list.comp';
import { SharedService } from '../../../services/shared/shared.service';
import { of } from 'rxjs';
import { IDepartment } from '../dep.comp';
import { By } from '@angular/platform-browser';

describe('DepListComp', () => {
  let component: DepListComp;
  let fixture: ComponentFixture<DepListComp>;
  let service: SharedService;
  let spy: jasmine.Spy;
  let mockList: IDepartment[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepListComp],
      imports: [HttpClientModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepListComp);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get<SharedService>(SharedService as any);
    mockList = [{departmentId: 1, departmentName: ''}];
    fixture.detectChanges();
  });

  it('should create department list component', () => {
    expect(component).toBeTruthy();
  });

  it('should call shared service when update department list', () => {
    spy = spyOn(service, 'getDepartmentListFromDB').and.returnValue(of(mockList));
    component.updateDepartmentList();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set department list value when update department list', () => {
    spyOn(service, 'getDepartmentListFromDB').and.returnValue(of(mockList));
    component.updateDepartmentList();
    expect(component.departmentList).toEqual(mockList);
  });

  it('should set department list filter value when update department list', () => {
    spyOn(service, 'getDepartmentListFromDB').and.returnValue(of(mockList));
    component.updateDepartmentList();
    expect(component.departmentListWithoutFilter).toEqual(mockList);
  });

  it('should call add department method when click on button', () => {
    spyOn(component, 'addDepartment');
    const btn = fixture.debugElement.query(By.css('.btn-float'));
    btn.triggerEventHandler('click', null);
    expect(component.addDepartment).toHaveBeenCalled();
  });

  it('should call shared service when delete department', () => {
    const spy = spyOn(service, 'deleteDepartmentFromDB').and.returnValue(of(mockList[0].departmentName));
    component.deleteDepartment(mockList[0]);
    expect(spy.calls.any()).toBeTruthy();
  });
});
