import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpModalComp } from './emp-modal.comp';
import { SharedService } from '../../../services/shared/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IEmployee } from '../emp.comp';
import { By } from '@angular/platform-browser';

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

  it('should call update employee method when click on update button', () => {
    spyOn(component, 'updateEmployee');
    const btn = fixture.debugElement.query(By.css('.update'));
    btn.triggerEventHandler('click', null);
    expect(component.updateEmployee).toHaveBeenCalled();
  });

  it('should call shared service when update employee', () => {
    const spy = spyOn(service, 'updateEmployeeToDB').and.returnValue(of(mockList[0]));
    component.updateEmployee();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should call event when select photo file', () => {
    const fakeChangeEvent = new Event('change');
    spyOn(component, 'onFileSelected');
    let elem = document.getElementById('input');
    elem.dispatchEvent(fakeChangeEvent);
    expect(component.onFileSelected).toHaveBeenCalledWith(fakeChangeEvent);
  });

  it('should call file reader when select photo file', () => {
    const mockReader: FileReader = jasmine.createSpyObj('FileReader', ['readAsDataURL', 'onload']);
    const mockFile: File = new File([''], 'filename', {type: 'text/html'});
    const mockEvent = {target: {files: [mockFile]}};
    spyOn(window as any, 'FileReader').and.returnValue(mockReader);
    component.onFileSelected(mockEvent as any);
    expect((window as any).FileReader).toHaveBeenCalled();
    expect(mockReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });

  it('should call shared service when upload photo file', () => {
    const spy = spyOn(service, 'uploadPhotoToStorage').and.returnValue(of(mockList[0]));
    component.uploadPhoto();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set photo name value when upload photo file', () => {
    spyOn(service, 'uploadPhotoToStorage').and.returnValue(of(mockList[0]));
    component.uploadPhoto();
    expect(component.photoFileName).toEqual(mockList[0]);
  });
});
