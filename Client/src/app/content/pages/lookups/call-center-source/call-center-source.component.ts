import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CallCenterSourceService } from './call-center-source.service';

@Component({
	selector: 'm-call-center-source',
	templateUrl: './call-center-source.component.html',
	styleUrls: ['./call-center-source.component.scss']
})
export class CallCenterSourceComponent implements OnInit {
	dataSource;
	displayedColumns = ['id', 'name', 'nameEn'];
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// Filter fields
	@ViewChild('searchInput')
	searchInput: ElementRef;

	constructor(private callCenterSourceService: CallCenterSourceService) {}

	ngOnInit() {
		this.callCenterSourceService.getCallCenterSource().subscribe(result => {
			if (!result) {
				return;
			}
			console.log(result);
			this.dataSource = new MatTableDataSource(result);
			this.dataSource.sort = this.sort;
		});
	}
}
