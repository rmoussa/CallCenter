import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UnitService } from './unit.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
	selector: 'm-unit',
	templateUrl: './unit.component.html',
	styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
	dataSource;
	displayedColumns = ['id', 'name', 'nameEn'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	// Filter fields
  @ViewChild('searchInput') searchInput: ElementRef;

	constructor(private unitService: UnitService) {}

	ngOnInit() {
		this.unitService.getUnit().subscribe(result => {
			if (!result) {
				return;
      }
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
		});
	}
}
