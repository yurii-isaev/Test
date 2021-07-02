import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';
import { IDepartment } from '../dep.comp';

@Component({
  selector: 'app-dep-list',
  templateUrl: './dep-list.comp.html',
  styleUrls: ['./dep-list.comp.css']
})
export class DepListComp implements OnInit {
  department: IDepartment;
  departmentList: IDepartment[];
  activateAddEditDepComp: boolean;
  modalTitle: string;
  departmentIdFilter: string;
  departmentNameFilter: string;
  departmentListWithoutFilter: IDepartment[];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.updateDepartmentList();
  }

  updateDepartmentList(): void {
    this.service.getDepartmentListFromDB().subscribe((response: IDepartment[]) => {
      this.departmentList = response;
      this.departmentListWithoutFilter = response;
      this.activateAddEditDepComp = false;
      this.departmentIdFilter = '';
      this.departmentNameFilter = '';
    });
  }

  addDepartment(): void {
    this.department = {
      departmentId: 0,
      departmentName: ''
    };
    this.modalTitle = 'Add Department';
    this.activateAddEditDepComp = true;
  }

  closeDepartmentModal(): void {
    this.activateAddEditDepComp = false
    this.updateDepartmentList();
  }

  editDepartment(dataItem: IDepartment): void {
    this.department = dataItem;
    this.modalTitle = 'Edit Department';
    this.activateAddEditDepComp = true;
  }

  showConfirmDeleteDepartment(dataItem: IDepartment): void {
    if (confirm('Are you sure??'))
      this.deleteDepartment(dataItem);
  }

  deleteDepartment(dataItem: IDepartment): void {
    this.service.deleteDepartmentFromDB(dataItem.departmentId).subscribe((response: string) => {
      try {
        alert(response);
        this.updateDepartmentList();
        console.warn('Employee deleted!')
      } catch (e) {
        e.console.error('Employee not deleted!')
      }
    });
  }

  toFilterDepartmentList(): void {
    let depIdFilter = this.departmentIdFilter;
    let depNameFilter = this.departmentNameFilter;

    this.departmentList = this.departmentListWithoutFilter.filter((dep: IDepartment) => {
      return dep.departmentId.toString().toLowerCase()
          .includes(depIdFilter.toString().trim().toLowerCase())
        &&
        dep.departmentName.toString().toLowerCase()
          .includes(depNameFilter.toString().trim().toLowerCase())
    });
  }

  toSortDepartmentList(prop: string, asc: boolean): void {
    this.departmentList = this.departmentList.sort((a, b) => {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }
}
