import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { ProductCat2 } from '../models/product-cat2';
import { HttpUtilsService } from '../../../../core/services/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { mergeMap } from 'rxjs/operators';

const API_URL = 'cat2s';
@Injectable({
	providedIn: 'root'
})
export class ProductCat2Service {
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService
		) {}
	getCat2(): Observable<ProductCat2[]> {
		return this.http.get<ProductCat2[]>('Cat2s');
	}

	getProductCat2ById(productCat2Id: number): Observable<ProductCat2> {
		return this.http.get<ProductCat2>(API_URL + `/${productCat2Id}`);
	}

	createProductCat2(productCat2): Observable<ProductCat2> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductCat2>(API_URL, productCat2, {
			headers: httpHeaders
		});
	}

	updateProductCat2(productCat2: ProductCat2): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(`${API_URL}/${productCat2.id}`, productCat2, {
			headers: httpHeaders
		});
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findProductCat2s(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_URL;
		return this.http.get<ProductCat2[]>(API_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'type']);
				return of(result);
			})
		);
	}

	// DELETE => delete the ProductCat2 from the server
	deleteProductCat2(productCat2Id: number): Observable<ProductCat2> {
		const url = `${API_URL}/${productCat2Id}`;
		return this.http.delete<ProductCat2>(url);
	}
}
