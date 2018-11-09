import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CallCenterSource } from '../models/call-center-source';

@Injectable()
export class CallCenterSourceService {
	constructor(private http: HttpClient) {}

	getCallCenterSource(): Observable<CallCenterSource[]> {
		return this.http.get<CallCenterSource[]>('CallCenterSources');
	}
}
