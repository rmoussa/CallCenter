import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { Unit } from '../models/unit';
import { HttpUtilsService } from '../../../../core/services/http-utils.service';
import { QueryParamsModel } from '../models/query-models/query-params.model';
import { QueryResultsModel } from '../models/query-models/query-results.model';
import { mergeMap } from 'rxjs/operators';

const API_UNITS_URL = 'units';

@Injectable()
export class UnitService {
	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService
	) {}

	// READ
	getUnit(): Observable<Unit[]> {
		return this.http.get<Unit[]>(API_UNITS_URL);
	}

	getUnitById(unitId: number): Observable<Unit> {
		return this.http.get<Unit>(API_UNITS_URL + `/${unitId}`);
	}

	createUnit(unit): Observable<Unit> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<Unit>(API_UNITS_URL, unit, {
			headers: httpHeaders
		});
	}

	updateUnit(unit: Unit): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(`${API_UNITS_URL}/${unit.id}`, unit, {
			headers: httpHeaders
		});

	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findUnits(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const url = API_UNITS_URL;
		return this.http.get<Unit[]>(API_UNITS_URL).pipe(
			mergeMap(res => {
				const result = this.httpUtils.baseFilter(res, queryParams, ['status', 'type']);
				return of(result);
			})
		);
	}

	// DELETE => delete the Unit from the server
	deleteUnit(unitId: number): Observable<Unit> {
		const url = `${API_UNITS_URL}/${unitId}`;
		return this.http.delete<Unit>(url);
	}
}
