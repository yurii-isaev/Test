import { inject, TestBed } from '@angular/core/testing';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IDepartment } from '../../components/department/dep.comp';
import { IEmployee } from '../../components/employee/emp.comp';

describe('SharedService', () => {
  let service: SharedService;
  let formData: FormData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(SharedService);
    formData = new FormData();
  });

  it('should create the shared service', () => {
    expect(service).toBeTruthy();
  });

  it('should return a department list from database', inject([SharedService, HttpTestingController],
    (service: SharedService, backend: HttpTestingController) => {
      const mockDepartmentList: IDepartment[] = [];
      service.getDepartmentListFromDB().subscribe((response: IDepartment[]) =>
        expect(response).toEqual(mockDepartmentList)
      );
      backend.expectOne({
        method: 'GET',
        url: 'http://localhost:5000/api/department'
      })
        .flush(mockDepartmentList);
    })
  );

  it('should return a execution report when add department to database',
    inject([SharedService, HttpTestingController], (service: SharedService, backend: HttpTestingController) => {
      const mockDepartment: IDepartment = <IDepartment>{};
      const mockReport: string = 'Created Successfully';
      service.addDepartmentToDB(mockDepartment).subscribe((response: string) =>
        expect(response).toEqual(mockReport)
      );
      backend.expectOne({
        method: 'POST',
        url: 'http://localhost:5000/api/department'
      })
        .flush(mockReport);
    })
  );

  it('should return a execution report when update department to database',
    inject([SharedService, HttpTestingController], (service: SharedService, backend: HttpTestingController) => {
      const mockDepartment: IDepartment = <IDepartment>{};
      const mockReport: string = 'Update successful';
      service.updateDepartmentToDB(mockDepartment).subscribe((response: string) =>
        expect(response).toEqual(mockReport)
      );
      backend.expectOne({
        method: 'PUT',
        url: 'http://localhost:5000/api/department'
      })
        .flush(mockReport);
    })
  );

  it('should return a execution report when delete department to database',
    inject([SharedService, HttpTestingController], (service: SharedService, backend: HttpTestingController) => {
      const mockDepartmentID: number = 1;
      const mockReport: string = 'Delete successful';
      service.deleteDepartmentFromDB(mockDepartmentID).subscribe((response: string) =>
        expect(response).toEqual(mockReport)
      );
      backend.expectOne({
        method: 'DELETE',
        url: 'http://localhost:5000/api/department/' + mockDepartmentID
      })
        .flush(mockReport);
    })
  );

  it('should return a employee list from database', inject([SharedService, HttpTestingController],
    (service: SharedService, backend: HttpTestingController) => {
      const mockEmployeeList: IEmployee[] = [];
      service.getEmployeeListFromDB().subscribe((response: IEmployee[]) =>
        expect(response).toEqual(mockEmployeeList)
      );
      backend.expectOne({
        method: 'GET',
        url: 'http://localhost:5000/api/employee'
      })
        .flush(mockEmployeeList);
    })
  );

  it('should return a execution report when add employee to database',
    inject([SharedService, HttpTestingController], (service: SharedService, backend: HttpTestingController) => {
      const mockEmployee: IEmployee = <IEmployee>{};
      const mockReport: string = 'Created Successfully';
      service.addEmployeeToDB(mockEmployee).subscribe((response: string) =>
        expect(response).toEqual(mockReport)
      );
      backend.expectOne({
        method: 'POST',
        url: 'http://localhost:5000/api/employee/'
      })
        .flush(mockReport);
    })
  );

  it('should return a execution report when update employee to database',
    inject([SharedService, HttpTestingController], (service: SharedService, backend: HttpTestingController) => {
      const mockEmployee: IEmployee = <IEmployee>{};
      const mockReport: string = 'Created Successfully';
      service.updateEmployeeToDB(mockEmployee).subscribe((response: string) =>
        expect(response).toEqual(mockReport)
      );
      backend.expectOne({
        method: 'PUT',
        url: 'http://localhost:5000/api/employee'
      })
        .flush(mockReport);
    })
  );

  it('should return a execution report when delete employee to database',
    inject([SharedService, HttpTestingController], (service: SharedService, backend: HttpTestingController) => {
      const mockEmployeeID: number = 1;
      const mockReport: string = 'Delete successful';
      service.deleteEmployeeFromDB(mockEmployeeID).subscribe((response: string) =>
        expect(response).toEqual(mockReport)
      );
      backend.expectOne({
        method: 'DELETE',
        url: 'http://localhost:5000/api/employee/' + mockEmployeeID
      })
        .flush(mockReport);
    })
  );

  it('should return a update photo file name from database',
    inject([SharedService, HttpTestingController], (service: SharedService, backend: HttpTestingController) => {
      const mockPhotoName = 'photo name';
      service.updatePhotoToStorage(1, formData).subscribe((response: string) =>
        expect(response).toEqual(mockPhotoName)
      );
      backend.expectOne({
        method: 'POST',
        url: 'http://localhost:5000/api/employee/1/UpdatePhoto'
      })
        .flush(mockPhotoName);
    })
  );
});
