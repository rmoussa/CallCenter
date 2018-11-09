import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductCat1Service } from './product-cat1.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
	selector: 'm-product-cat1',
	templateUrl: './product-cat1.component.html',
	styleUrls: ['./product-cat1.component.scss']
})
export class ProductCat1Component implements OnInit {
	dataSource;
	displayedColumns = ['id', 'name', 'nameEn'];
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// Filter fields
	@ViewChild('searchInput')
	searchInput: ElementRef;

	constructor(private productCat1Service: ProductCat1Service) {}

	ngOnInit() {
		this.productCat1Service.getCat1().subscribe(result => {
			if (!result) {
				return;
			}
			console.log(result);
			this.dataSource = new MatTableDataSource(result);
			this.dataSource.sort = this.sort;
		});
	}
}
