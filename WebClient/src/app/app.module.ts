import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpComp } from './components/employee/emp.comp';
import { EmpListComp } from './components/employee/emp-list/emp-list.comp';

@NgModule({
  declarations: [
    AppComponent,
    EmpComp,
    EmpListComp,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
