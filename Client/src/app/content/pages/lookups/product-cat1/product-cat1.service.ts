import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { ProductCat1 } from '../models/product-cat1';
import { HttpUtilsService } from '../../../../core/services/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { mergeMap } from 'rxjs/operators';

const API_URL = 'cat1s';
@Injectable({
	providedIn: 'root'
})
export class ProductCat1Service {
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService
		) {}
	getCat1(): Observable<ProductCat1[]> {
		return this.http.get<ProductCat1[]>('Cat1s');
	}

	getProductCat1ById(productCat1Id: number): Observable<ProductCat1> {
		return this.http.get<ProductCat1>(API_URL + `/${productCat1Id}`);
	}

	createProductCat1(productCat1): Observable<ProductCat1> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductCat1>(API_URL, productCat1, {
			headers: httpHeaders
		});
	}

	updateProductCat1(productCat1: ProductCat1): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(`${API_URL}/${productCat1.id}`, productCat1, {
			headers: httpHeaders
		});
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findProductCat1s(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_URL;
		return this.http.get<ProductCat1[]>(API_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'type']);
				return of(result);
			})
		);
	}

	// DELETE => delete the ProductCat1 from the server
	deleteProductCat1(productCat1Id: number): Observable<ProductCat1> {
		const url = `${API_URL}/${productCat1Id}`;
		return this.http.delete<ProductCat1>(url);
	}
}
