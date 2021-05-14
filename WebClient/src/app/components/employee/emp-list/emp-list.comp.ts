import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';
import { IEmployee } from '../emp.comp';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.comp.html',
  styleUrls: ['./emp-list.comp.css']
})
export class EmpListComp implements OnInit {
  employee: IEmployee;
  employeeList: string[];
  modalTitle: string;
  activateAddEditEmpComp: boolean;

  constructor(private service: SharedService) {
    this.activateAddEditEmpComp = false;
  }

  ngOnInit(): void {
    this.updateEmployeeList();
  }

  updateEmployeeList(): void {
    this.service.getEmployeeListFromDB().subscribe(data => this.employeeList = data);
  }

  addEmployee(): void {
    this.employee = {
      employeeId: 0,
      employeeName: '',
      department: '',
      dateOfJoining: '',
      photoFileName: 'anonymous.png'
    }
    this.modalTitle = 'Add Employee';
    this.activateAddEditEmpComp = true;
  }

  closeEmployeeModal(): void {
    this.updateEmployeeList();
    this.activateAddEditEmpComp = false;
  }

  editEmployee(item: IEmployee): void {
    this.employee = item;
    this.modalTitle = "Edit Employee";
    this.activateAddEditEmpComp = true;
    console.warn(item);
  }

  deleteEmployee(item: IEmployee): void {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployeeFromDB(item.employeeId).subscribe((data: string) => {
        try {
          alert(data);
          this.updateEmployeeList();
          console.warn('Employee deleted!')
        } catch (e) {
          e.console.error('Employee not deleted!')
        }
      });
    }
  }
}
