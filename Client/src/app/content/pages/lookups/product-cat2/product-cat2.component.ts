import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductCat2Service } from './product-cat2.service';

@Component({
  selector: 'm-product-cat2',
  templateUrl: './product-cat2.component.html',
  styleUrls: ['./product-cat2.component.scss']
})
export class ProductCat2Component implements OnInit {

  dataSource;
	displayedColumns = ['id', 'name', 'nameEn'];
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// Filter fields
	@ViewChild('searchInput')
	searchInput: ElementRef;

	constructor(private productCat2Service: ProductCat2Service) {}

	ngOnInit() {
		this.productCat2Service.getCat2().subscribe(result => {
			if (!result) {
				return;
			}
			console.log(result);
			this.dataSource = new MatTableDataSource(result);
			this.dataSource.sort = this.sort;
		});
	}

}
