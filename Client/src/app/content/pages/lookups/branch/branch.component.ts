import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BranchService } from './branch.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
	selector: 'm-branch',
	templateUrl: './branch.component.html',
	styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
	dataSource;
	displayedColumns = ['id', 'name', 'nameEn'];
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// Filter fields
	@ViewChild('searchInput')
	searchInput: ElementRef;

	constructor(private branchService: BranchService) {}

	ngOnInit() {
		this.branchService.getBranch().subscribe(result => {
			if (!result) {
				return;
			}
			console.log(result);
			this.dataSource = new MatTableDataSource(result);
			this.dataSource.sort = this.sort;
		});
	}
}
