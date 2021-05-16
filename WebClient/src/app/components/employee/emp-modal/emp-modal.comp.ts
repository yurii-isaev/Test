import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';
import { IEmployee } from '../emp.comp';

@Component({
  selector: 'app-emp-modal',
  templateUrl: './emp-modal.comp.html',
  styleUrls: ['./emp-modal.comp.css']
})
export class EmpModalComp implements OnInit {
  @Input() emp: IEmployee;
  departmentList: string[];
  employeeId: number;
  employeeName: string;
  department: string;
  dateOfJoining: string;
  photoFileName: string;
  photoFilePath: string;
  fileToUpload: File;
  formData: FormData;

  constructor(private service: SharedService) {
    this.fileToUpload = null;
    this.formData = new FormData();
  }

  ngOnInit(): void {
    this.loadDepartmentList()
    this.employeeId = this.emp.employeeId;
    this.employeeName = this.emp.employeeName;
    this.department = this.emp.department;
    this.dateOfJoining = this.emp.dateOfJoining;
    this.photoFileName = this.emp.photoFileName;
    this.photoFilePath = this.service.PhotoUrl + this.photoFileName;
  }

  loadDepartmentList(): void {
    this.service.getAllDepartmentNamesFromDB().subscribe((data: string[]) => {
      this.departmentList = data;
    });
  }

  private getEmployee(): IEmployee {
    return this.emp = {
      employeeId: this.employeeId,
      employeeName: this.employeeName,
      department: this.department,
      dateOfJoining: this.dateOfJoining,
      photoFileName: this.photoFileName
    };
  }

  addEmployee(): void {
    this.service.addEmployeeToDB(this.getEmployee()).subscribe((data: string) => {
      alert(data);
    });
  }

  updateEmployee(): void {
    this.service.updateEmployeeToDB(this.getEmployee()).subscribe(() => {
      console.warn(this.photoFileName, this.photoFilePath);
    });
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];

    // Show image preview.
    const reader = new FileReader();
    reader.onload = (event: any) => this.photoFilePath = event.target.result;
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.photoFileName, this.photoFilePath, this.fileToUpload);
  }

  uploadPhoto(): void {
    this.formData.append('File', this.fileToUpload, this.fileToUpload.name);
    this.service.uploadPhotoToStorage(this.formData).subscribe((data: string) => {
      try {
        this.photoFileName = data.toString();
        this.photoFilePath = this.service.PhotoUrl + this.photoFileName;
        console.warn('Photo is upload!')
      } catch (e) {
        e.console.error('Photo was not upload!')
      }
    });
  }

  updatePhoto(employeeId: number): void {
    this.formData.append('File', this.fileToUpload, this.fileToUpload.name);
    this.service.updatePhotoToStorage(employeeId, this.formData).subscribe((data: string) => {
      try {
        this.photoFileName = data.toString();
        this.photoFilePath = this.service.PhotoUrl + this.photoFileName;
        console.warn('Photo is update!')
      } catch (e) {
        e.console.error('Photo was not update!')
      }
    });
  }
}
