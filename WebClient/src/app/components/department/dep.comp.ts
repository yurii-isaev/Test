import { Component, OnInit } from '@angular/core';

export interface IDepartment {
  departmentId: number;
  departmentName: string;
}

@Component({
  selector: 'app-dep',
  templateUrl: './dep.comp.html',
  styleUrls: ['./dep.comp.css']
})
export class DepComp implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}
