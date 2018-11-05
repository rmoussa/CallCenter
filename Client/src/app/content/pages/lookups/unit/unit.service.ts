import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Unit } from '../models/unit';

@Injectable()
export class UnitService {
	units: Unit[] = [{ id: 1, name: 'ax', nameEn: 'xx' }];

	constructor(private http: HttpClient) {}

	getUnit(): Observable<Unit[]> {
		return this.http.get<Unit[]>('http://localhost:49171/api/units');
	}
}
