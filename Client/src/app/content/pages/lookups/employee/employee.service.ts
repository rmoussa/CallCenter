import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {
	constructor(private http: HttpClient) {}

	getEmployee(): Observable<Employee[]> {
		return this.http.get<Employee[]>(
			'employees'
		);
	}
}
