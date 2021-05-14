import { Component, OnInit } from '@angular/core';

export interface IEmployee {
  employeeId: number;
  employeeName: string;
  department: string;
  dateOfJoining: string;
  photoFileName: string;
}

@Component({
  selector: 'app-emp',
  templateUrl: './emp.comp.html',
  styleUrls: ['./emp.comp.css']
})
export class EmpComp implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}
