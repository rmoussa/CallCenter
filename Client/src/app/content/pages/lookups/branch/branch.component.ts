import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BranchService } from './branch.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LayoutUtilsService, MessageType } from '../_core/utils/layout-utils.service';
import { Branch } from '../models/branch';

@Component({
	selector: 'm-branch',
	templateUrl: './branch.component.html',
	styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
	dataSource;
	displayedColumns = ['id', 'name', 'nameEn', 'actions'];
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// Filter fields
	@ViewChild('searchInput')
	searchInput: ElementRef;

	constructor(private branchService: BranchService,
		private layoutUtilsService: LayoutUtilsService
		) {}

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
	/** Delete */
	deleteBranch(_item: Branch) {
		const _title: string = 'Branch Delete';
		const _description: string =
			'Are you sure to permanently delete this Branch?';
		const _waitDesciption: string = 'Branch is deleting...';
		const _deleteMessage = `Branch has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(
			_title,
			_description,
			_waitDesciption
		);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.branchService.deleteBranch(_item.id).subscribe(() => {
				this.layoutUtilsService.showActionNotification(
					_deleteMessage,
					MessageType.Delete
				);
				this.loadBranchsList();
			});
		});
	}
	loadBranchsList() {
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
