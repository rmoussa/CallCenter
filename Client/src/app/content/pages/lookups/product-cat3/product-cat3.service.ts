import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductCat3 } from '../models/product-cat3';

@Injectable()
export class ProductCat3Service {
	constructor(private http: HttpClient) {}

	getCat3(): Observable<ProductCat3[]> {
		return this.http.get<ProductCat3[]>(
			'productCat3'
		);
	}
}
