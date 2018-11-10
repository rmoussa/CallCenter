import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { Employee } from '../models/employee';
import { HttpUtilsService } from '../../../../core/services/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { mergeMap } from 'rxjs/operators';

const API_URL = 'employees';
@Injectable()
export class EmployeeService {
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService
		) {}

	getEmployee(): Observable<Employee[]> {
		return this.http.get<Employee[]>(
			'employees'
		);
	}

	getEmployeeById(employeeId: number): Observable<Employee> {
		return this.http.get<Employee>(API_URL + `/${employeeId}`);
	}

	createEmployee(employee): Observable<Employee> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<Employee>(API_URL, employee, {
			headers: httpHeaders
		});
	}

	updateEmployee(employee: Employee): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(`${API_URL}/${employee.id}`, employee, {
			headers: httpHeaders
		});
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findEmployees(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_URL;
		return this.http.get<Employee[]>(API_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'type']);
				return of(result);
			})
		);
	}

	// DELETE => delete the Employee from the server
	deleteEmployee(employeeId: number): Observable<Employee> {
		const url = `${API_URL}/${employeeId}`;
		return this.http.delete<Employee>(url);
	}
}
