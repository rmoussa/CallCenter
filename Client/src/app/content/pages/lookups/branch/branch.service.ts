import { Injectable } from '@angular/core';
import { Branch } from '../models/branch';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BranchService {
	constructor(private http: HttpClient) {}

	getBranch(): Observable<Branch[]> {
		return this.http.get<Branch[]>('branchs');
	}
}
