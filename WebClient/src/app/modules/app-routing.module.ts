import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpComp } from '../components/employee/emp.comp';
import { DepComp } from '../components/department/dep.comp';

const routes: Routes = [
  {path: 'employee', component: EmpComp},
  {path: 'department', component: DepComp}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
