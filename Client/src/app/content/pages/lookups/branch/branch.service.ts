import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { Branch } from '../models/branch';
import { HttpUtilsService } from '../../../../core/services/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { mergeMap } from 'rxjs/operators';

const API_URL = 'branchs';

@Injectable({
	providedIn: 'root'
})
export class BranchService {
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService
		) {}

	getBranch(): Observable<Branch[]> {
		return this.http.get<Branch[]>('branchs');
	}

	getBranchById(branchId: number): Observable<Branch> {
		return this.http.get<Branch>(API_URL + `/${branchId}`);
	}

	createBranch(branch): Observable<Branch> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<Branch>(API_URL, branch, {
			headers: httpHeaders
		});
	}

	updateBranch(branch: Branch): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(`${API_URL}/${branch.id}`, branch, {
			headers: httpHeaders
		});
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findBranchs(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_URL;
		return this.http.get<Branch[]>(API_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'type']);
				return of(result);
			})
		);
	}

	// DELETE => delete the Branch from the server
	deleteBranch(branchId: number): Observable<Branch> {
		const url = `${API_URL}/${branchId}`;
		return this.http.delete<Branch>(url);
	}
}
