import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductCat3Service } from './product-cat3.service';

@Component({
  selector: 'm-product-cat3',
  templateUrl: './product-cat3.component.html',
  styleUrls: ['./product-cat3.component.scss']
})
export class ProductCat3Component implements OnInit {
  dataSource;
	displayedColumns = ['id', 'name', 'nameEn'];
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// Filter fields
	@ViewChild('searchInput')
	searchInput: ElementRef;

	constructor(private productCat3Service: ProductCat3Service) {}

	ngOnInit() {
		this.productCat3Service.getCat3().subscribe(result => {
			if (!result) {
				return;
			}
			console.log(result);
			this.dataSource = new MatTableDataSource(result);
			this.dataSource.sort = this.sort;
		});
	}

}
