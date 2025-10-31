import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../shared/employee";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiURL}/employees`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get employee by ID
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiURL}/employees/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Create new employee
  createEmployee(employee: any): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiURL}/employees`, JSON.stringify(employee), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Update employee
  updateEmployee(id: number, employee: any): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiURL}/employees/${id}`, JSON.stringify(employee), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Delete employee
  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.apiURL}/employees/${id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handler
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => errorMessage);
  }
}
