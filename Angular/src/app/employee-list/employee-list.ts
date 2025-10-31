import { Component,OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  Employee:any=[];
  constructor(public restApi:RestApiService){}

  ngOnInit(){
    this.loadEmployees()
  }

  loadEmployees(){
    return this.restApi.getEmployees().subscribe((data:{})=>{
      this.Employee=data;
    })
  }

  deleteEmployee(id: any){
    if(window.confirm('Are you sure, You want to Delete ??')){
      this.restApi.deleteEmployee(id).subscribe(data=>{
        this.loadEmployees()
      })
    }
  }

}
