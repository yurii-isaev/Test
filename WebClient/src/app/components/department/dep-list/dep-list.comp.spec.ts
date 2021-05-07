import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DepListComp } from './dep-list.comp';
import { SharedService } from '../../../services/shared/shared.service';
import { of } from 'rxjs';

describe('DepListComp', () => {
  let component: DepListComp;
  let fixture: ComponentFixture<DepListComp>;
  let service: SharedService;
  let spy: jasmine.Spy;
  let mockList: string[];

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
    spy = spyOn(service, 'getDepartmentList').and.returnValue(of(mockList));
    fixture.detectChanges();
  });

  it('should create department list component', () => {
    expect(component).toBeTruthy();
  });

  it('should call shared service when update department list', () => {
    component.updateDepartmentList();
    expect(spy.calls.any()).toBeTruthy();
  });
});
