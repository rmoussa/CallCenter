import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { Customer } from '../models/customer';
import { HttpUtilsService } from '../../../../core/services/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { mergeMap } from 'rxjs/operators';

const API_URL = 'customers';
@Injectable()
export class CustomerService {
	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService
	) {}

	getCustomer(): Observable<Customer[]> {
		return this.http.get<Customer[]>('customers');
	}

	getCustomerById(customerId: number): Observable<Customer> {
		return this.http.get<Customer>(API_URL + `/${customerId}`);
	}

	createCustomer(customer): Observable<Customer> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<Customer>(API_URL, customer, {
			headers: httpHeaders
		});
	}

	updateCustomer(customer: Customer): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(`${API_URL}/${customer.id}`, customer, {
			headers: httpHeaders
		});
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findCustomers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_URL;
		return this.http.get<Customer[]>(API_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, [
					'status',
					'type'
				]);
				return of(result);
			})
		);
	}

	// DELETE => delete the Customer from the server
	deleteCustomer(customerId: number): Observable<Customer> {
		const url = `${API_URL}/${customerId}`;
		return this.http.delete<Customer>(url);
	}
}
