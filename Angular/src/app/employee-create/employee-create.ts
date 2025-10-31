import { Component, Input, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-create',
  imports: [FormsModule],
  templateUrl: './employee-create.html',
  styleUrl: './employee-create.css',
})
export class EmployeeCreate implements OnInit{

  @Input() employeeDetails={name:'',email:'',phone:0}

  constructor(
    public restApi:RestApiService,
    public router:Router
  ){}

  ngOnInit() {}

  addEmployee(){
    this.restApi.createEmployee(this.employeeDetails).subscribe((data:{})=>{
      this.router.navigate(['/employees-list'])
    })
  }

}



