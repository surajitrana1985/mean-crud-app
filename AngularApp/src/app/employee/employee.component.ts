import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../models/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.employeeService.selectedEmployee = {
      _id: '',
      name: '',
      position: '',
      office: '',
      salary: null
    };
  }

  onSubmit(form: NgForm) {
    if(form.value._id == '') {
      this.employeeService.postEmployee(form.value).subscribe((response) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({
          html: 'Saved successfully',
          classes: 'rounded'
        });
      });
    } else {
      this.employeeService.putEmployee(form.value).subscribe((response) => {
        this.resetForm();
        this.refreshEmployeeList();
        M.toast({
          html: 'Updated successfully',
          classes: 'rounded'
        });
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((response) => {
      this.employeeService.employees = response as Array<Employee>;
    });
  }

  onEdit(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you sure to delete this record?')) {
      this.employeeService.deleteEmployee(_id).subscribe((response) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({
          html: 'Deleted successfully',
          classes: 'rounded'
        });
      });
    }
  }

}
