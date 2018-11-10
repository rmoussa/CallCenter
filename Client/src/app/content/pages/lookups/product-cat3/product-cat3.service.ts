import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { ProductCat3 } from '../models/product-cat3';
import { HttpUtilsService } from '../../../../core/services/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { mergeMap } from 'rxjs/operators';

const API_URL = 'cat3s';
@Injectable({
	providedIn: 'root'
})
export class ProductCat3Service {
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService
		) {}
	getCat3(): Observable<ProductCat3[]> {
		return this.http.get<ProductCat3[]>('Cat3s');
	}

	getProductCat3ById(productCat3Id: number): Observable<ProductCat3> {
		return this.http.get<ProductCat3>(API_URL + `/${productCat3Id}`);
	}

	createProductCat3(productCat3): Observable<ProductCat3> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductCat3>(API_URL, productCat3, {
			headers: httpHeaders
		});
	}

	updateProductCat3(productCat3: ProductCat3): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(`${API_URL}/${productCat3.id}`, productCat3, {
			headers: httpHeaders
		});
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findProductCat3s(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_URL;
		return this.http.get<ProductCat3[]>(API_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'type']);
				return of(result);
			})
		);
	}

	// DELETE => delete the ProductCat3 from the server
	deleteProductCat3(productCat3Id: number): Observable<ProductCat3> {
		const url = `${API_URL}/${productCat3Id}`;
		return this.http.delete<ProductCat3>(url);
	}
}
