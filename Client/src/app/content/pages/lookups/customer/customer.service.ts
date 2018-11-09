import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable()
export class CustomerService {
	constructor(private http: HttpClient) {}

	getCustomer(): Observable<Customer[]> {
		return this.http.get<Customer[]>(
			'customers'
		);
	}
}
