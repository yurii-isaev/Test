import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepModalComp } from './dep-modal.comp';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IDepartment } from '../dep.comp';
import { SharedService } from '../../../services/shared/shared.service';
import { of } from 'rxjs';

describe('DepModalComp', () => {
  let component: DepModalComp;
  let fixture: ComponentFixture<DepModalComp>;
  let service: SharedService;
  let mockList: string[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepModalComp],
      imports: [HttpClientModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepModalComp);
    component = fixture.componentInstance;
    component.dep = <IDepartment>{departmentId: 1};
    service = fixture.debugElement.injector.get<SharedService>(SharedService as any);
    mockList = ['test'];
    fixture.detectChanges();
  });

  it('should create department modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should call shared service when add department', () => {
    const spy = spyOn(service, 'addDepartmentToDB').and.returnValue(of(mockList[0]));
    component.addDepartment();
    expect(spy.calls.any()).toBeTruthy();
  });
});
