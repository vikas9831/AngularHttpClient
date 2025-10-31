import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employee-edit',
  imports: [FormsModule],
  templateUrl: './employee-edit.html',
  styleUrls: ['./employee-edit.css'],
})
export class EmployeeEdit implements OnInit {
  id!: number;
  employeeData: Employee = {} as Employee;

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.id = this.actRoute.snapshot.params['id'];
    this.restApi.getEmployee(this.id).subscribe((data: Employee) => {
      this.employeeData = data;
    });
  }

  updateEmployee() {
    if (window.confirm('Are you sure you want to update?')) {
      this.restApi.updateEmployee(this.id, this.employeeData).subscribe(() => {
        this.router.navigate(['/employees-list']);
      });
    }
  }
}
