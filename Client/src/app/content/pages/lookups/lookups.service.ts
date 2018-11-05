import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from '../../../core/services/http-utils.service';
import { Observable, forkJoin } from 'rxjs';

const API_UNIT_URL = 'api/unt';

@Injectable()
export class LookupsService {
	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService
	) {}

	// CREATE =>  POST: add a new customer to the server
	createObject(object): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<object>(API_UNIT_URL, object, {
			headers: httpHeaders
		});
	}

	// READ
	getAllObjects(): Observable<any[]> {
		return this.http.get<any[]>(API_UNIT_URL);
	}

	getObjectById(objectId: number): Observable<any> {
		return this.http.get<any>(
			API_UNIT_URL + `/${objectId}`
		);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// findObjects(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
	// 	// This code imitates server calls
	// 	const url = API_CUSTOMERS_URL;
	// 	return this.http.get<CustomerModel[]>(API_CUSTOMERS_URL).pipe(
	// 		mergeMap(res => {
	// 			const result = this.httpUtils.baseFilter(res, queryParams, [
	// 				'status',
	// 				'type'
	// 			]);
	// 			return of(result);
	// 		})
	// 	);
	// }

	// UPDATE => PUT: update the customer on the server
	updateObject(object): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_UNIT_URL, object, {
			headers: httpHeader
		});
	}

	// UPDATE Status
	// updateStatusForCustomer(customers: CustomerModel[], status: number): Observable<any> {
	// 	const tasks$ = [];
	// 	for (let i = 0; i < customers.length; i++) {
	// 		const _customer = customers[i];
	// 		_customer.status = status;
	// 		tasks$.push(this.updateCustomer(_customer));
	// 	}
	// 	return forkJoin(tasks$);
	// }

	// DELETE => delete the customer from the server
	deleteObject(objectId: number): Observable<any> {
		const url = `${API_UNIT_URL}/${objectId}`;
		return this.http.delete<any>(url);
	}

	deleteObjects(ids: number[] = []): Observable<any> {
		const tasks$ = [];
		const length = ids.length;
		for (let i = 0; i < length; i++) {
			tasks$.push(this.deleteObject(ids[i]));
		}
		return forkJoin(tasks$);
	}
}
