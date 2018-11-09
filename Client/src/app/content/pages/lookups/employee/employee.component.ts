import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmployeeService } from './employee.service';

@Component({
	selector: 'm-employee',
	templateUrl: './employee.component.html',
	styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
	dataSource;
	displayedColumns = ['id', 'name', 'nameEn', 'jobId'];
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// Filter fields
	@ViewChild('searchInput')
	searchInput: ElementRef;

	constructor(private employeeService: EmployeeService) {}

	ngOnInit() {
		this.employeeService.getEmployee().subscribe(result => {
			if (!result) {
				return;
			}
			console.log(result);
			this.dataSource = new MatTableDataSource(result);
			this.dataSource.sort = this.sort;
		});
	}
}
