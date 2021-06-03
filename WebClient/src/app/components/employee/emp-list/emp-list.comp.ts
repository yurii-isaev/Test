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
  employeeList: IEmployee[];
  modalTitle: string;
  activateAddEditEmpComp: boolean;

  constructor(private service: SharedService) {
    this.activateAddEditEmpComp = false;
  }

  ngOnInit(): void {
    this.updateEmployeeList();
  }

  updateEmployeeList(): void {
    this.service.getEmployeeListFromDB().subscribe((response: IEmployee[]) => {
      this.employeeList = response
    });
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

  showConfirmDeleteEmployee(item: IEmployee): void {
    if (confirm('Are you sure??'))
      return this.deleteEmployee(item);
  }

  deleteEmployee(item: IEmployee): void {
    this.service.deleteEmployeeFromDB(item.employeeId).subscribe((response: string) => {
      try {
        alert(response);
        this.updateEmployeeList();
        console.warn('Employee deleted!')
      } catch (e) {
        e.console.error('Employee not deleted!')
      }
    })
  };
}
