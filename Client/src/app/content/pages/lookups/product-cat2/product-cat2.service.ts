import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductCat2 } from '../models/product-cat2';

@Injectable()
export class ProductCat2Service {
	constructor(private http: HttpClient) {}

	getCat2(): Observable<ProductCat2[]> {
		return this.http.get<ProductCat2[]>(
			'productCat2'
		);
	}
}
