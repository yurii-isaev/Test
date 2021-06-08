import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DepListComp } from './dep-list.comp';
import { SharedService } from '../../../services/shared/shared.service';
import { of } from 'rxjs';
import { IDepartment } from '../dep.comp';

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
    mockList = [];
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
});
