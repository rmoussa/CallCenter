import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductCat4Service } from './product-cat4.service';

@Component({
  selector: 'm-product-cat4',
  templateUrl: './product-cat4.component.html',
  styleUrls: ['./product-cat4.component.scss']
})
export class ProductCat4Component implements OnInit {

  dataSource;
	displayedColumns = ['id', 'name', 'nameEn'];
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// Filter fields
	@ViewChild('searchInput')
	searchInput: ElementRef;

	constructor(private productCat4Service: ProductCat4Service) {}

	ngOnInit() {
		this.productCat4Service.getCat4().subscribe(result => {
			if (!result) {
				return;
			}
			console.log(result);
			this.dataSource = new MatTableDataSource(result);
			this.dataSource.sort = this.sort;
		});
	}

}
