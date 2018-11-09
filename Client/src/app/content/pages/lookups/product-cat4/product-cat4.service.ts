import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductCat4 } from '../models/product-cat4';

@Injectable()
export class ProductCat4Service {
	constructor(private http: HttpClient) {}

	getCat4(): Observable<ProductCat4[]> {
		return this.http.get<ProductCat4[]>(
			'productCat4'
		);
	}
}
