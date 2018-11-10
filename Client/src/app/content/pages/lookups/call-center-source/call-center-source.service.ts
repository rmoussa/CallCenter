import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { CallCenterSource } from '../models/call-center-source';
import { HttpUtilsService } from '../../../../core/services/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { mergeMap } from 'rxjs/operators';

const API_URL = 'CallCenterSources';

@Injectable()
export class CallCenterSourceService {
	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService
	) {}

	getCallCenterSource(): Observable<CallCenterSource[]> {
		return this.http.get<CallCenterSource[]>('callCenterSources');
	}

	getCallCenterSourceById(
		callCenterSourceId: number
	): Observable<CallCenterSource> {
		return this.http.get<CallCenterSource>(
			API_URL + `/${callCenterSourceId}`
		);
	}

	createCallCenterSource(callCenterSource): Observable<CallCenterSource> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<CallCenterSource>(API_URL, callCenterSource, {
			headers: httpHeaders
		});
	}

	updateCallCenterSource(
		callCenterSource: CallCenterSource
	): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(
			`${API_URL}/${callCenterSource.id}`,
			callCenterSource,
			{
				headers: httpHeaders
			}
		);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findCallCenterSources(
		queryParams: QueryParamsModel
	): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_URL;
		return this.http.get<CallCenterSource[]>(API_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, [
					'status',
					'type'
				]);
				return of(result);
			})
		);
	}

	// DELETE => delete the CallCenterSource from the server
	deleteCallCenterSource(
		callCenterSourceId: number
	): Observable<CallCenterSource> {
		const url = `${API_URL}/${callCenterSourceId}`;
		return this.http.delete<CallCenterSource>(url);
	}
}
