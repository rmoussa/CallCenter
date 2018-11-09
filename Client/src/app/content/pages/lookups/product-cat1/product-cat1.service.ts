import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductCat1 } from '../models/product-cat1';

@Injectable({
	providedIn: 'root'
})
export class ProductCat1Service {
	constructor(private http: HttpClient) {}

	getCat1(): Observable<ProductCat1[]> {
		return this.http.get<ProductCat1[]>('Cat1s');
	}
}
