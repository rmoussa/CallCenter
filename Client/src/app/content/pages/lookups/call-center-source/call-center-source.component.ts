
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CallCenterSourceService } from './call-center-source.service';
import { LayoutUtilsService, MessageType } from '../_core/utils/layout-utils.service';
import { CallCenterSource } from '../models/call-center-source';

@Component({
	selector: 'm-call-center-source',
	templateUrl: './call-center-source.component.html',
	styleUrls: ['./call-center-source.component.scss']
})
export class CallCenterSourceComponent implements OnInit {
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
		private callCenterSourceService: CallCenterSourceService,
		private layoutUtilsService: LayoutUtilsService
	) {}

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

	/** Delete */
	deleteCallCenterSource(_item: CallCenterSource) {
		const _title: string = 'CallCenterSource Delete';
		const _description: string =
			'Are you sure to permanently delete this CallCenterSource?';
		const _waitDesciption: string = 'CallCenterSource is deleting...';
		const _deleteMessage = `CallCenterSource has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(
			_title,
			_description,
			_waitDesciption
		);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.callCenterSourceService.deleteCallCenterSource(_item.id).subscribe(() => {
				this.layoutUtilsService.showActionNotification(
					_deleteMessage,
					MessageType.Delete
				);
				this.loadCallCenterSourcesList();
			});
		});
	}
	loadCallCenterSourcesList() {
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
