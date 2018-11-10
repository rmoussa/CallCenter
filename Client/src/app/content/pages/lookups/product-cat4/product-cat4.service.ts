import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { ProductCat4 } from '../models/product-cat4';
import { HttpUtilsService } from '../../../../core/services/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { mergeMap } from 'rxjs/operators';

const API_URL = 'cat4s';
@Injectable({
	providedIn: 'root'
})
export class ProductCat4Service {
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService
		) {}
	getCat4(): Observable<ProductCat4[]> {
		return this.http.get<ProductCat4[]>('Cat4s');
	}

	getProductCat4ById(productCat4Id: number): Observable<ProductCat4> {
		return this.http.get<ProductCat4>(API_URL + `/${productCat4Id}`);
	}

	createProductCat4(productCat4): Observable<ProductCat4> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductCat4>(API_URL, productCat4, {
			headers: httpHeaders
		});
	}

	updateProductCat4(productCat4: ProductCat4): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(`${API_URL}/${productCat4.id}`, productCat4, {
			headers: httpHeaders
		});
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findProductCat4s(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_URL;
		return this.http.get<ProductCat4[]>(API_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'type']);
				return of(result);
			})
		);
	}

	// DELETE => delete the ProductCat4 from the server
	deleteProductCat4(productCat4Id: number): Observable<ProductCat4> {
		const url = `${API_URL}/${productCat4Id}`;
		return this.http.delete<ProductCat4>(url);
	}
}
