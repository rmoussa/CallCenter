import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UnitService } from './unit.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Unit } from '../models/unit';
import { LayoutUtilsService, MessageType } from '../_core/utils/layout-utils.service';

@Component({
	selector: 'm-unit',
	templateUrl: './unit.component.html',
	styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
	dataSource;
	displayedColumns = ['id', 'name', 'nameEn', 'actions'];
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// Filter fields
	@ViewChild('searchInput')
	searchInput: ElementRef;

	constructor(
		private unitService: UnitService,
		private layoutUtilsService: LayoutUtilsService
	) {}

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

	/** Delete */
	deleteUnit(_item: Unit) {
		const _title: string = 'Unit Delete';
		const _description: string =
			'Are you sure to permanently delete this Unit?';
		const _waitDesciption: string = 'Unit is deleting...';
		const _deleteMessage = `Unit has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(
			_title,
			_description,
			_waitDesciption
		);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.unitService.deleteUnit(_item.id).subscribe(() => {
				this.layoutUtilsService.showActionNotification(
					_deleteMessage,
					MessageType.Delete
				);
				this.loadUnitsList();
			});
		});
	}
	loadUnitsList() {
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
