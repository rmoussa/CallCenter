import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer';
import { LayoutUtilsService, MessageType } from '../_core/utils/layout-utils.service';

@Component({
	selector: 'm-customer',
	templateUrl: './customer.component.html',
	styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
	dataSource;
	displayedColumns = [
		'id',
		'name',
		'code',
		'phone1',
		'phone2',
		'phone3',
		'actions'
	];
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	@ViewChild(MatSort)
	sort: MatSort;
	// Filter fields
	@ViewChild('searchInput')
	searchInput: ElementRef;

	constructor(
		private customerService: CustomerService,
		private layoutUtilsService: LayoutUtilsService
	) {}

	ngOnInit() {
		this.customerService.getCustomer().subscribe(result => {
			if (!result) {
				return;
			}
			console.log(result);
			this.dataSource = new MatTableDataSource(result);
			this.dataSource.sort = this.sort;
		});
	}

	/** Delete */
	deleteCustomer(_item: Customer) {
		const _title: string = 'Customer Delete';
		const _description: string =
			'Are you sure to permanently delete this Customer?';
		const _waitDesciption: string = 'Customer is deleting...';
		const _deleteMessage = `Customer has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(
			_title,
			_description,
			_waitDesciption
		);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.customerService.deleteCustomer(_item.id).subscribe(() => {
				this.layoutUtilsService.showActionNotification(
					_deleteMessage,
					MessageType.Delete
				);
				this.loadCustomersList();
			});
		});
	}
	loadCustomersList() {
		this.customerService.getCustomer().subscribe(result => {
			if (!result) {
				return;
			}
			console.log(result);
			this.dataSource = new MatTableDataSource(result);
			this.dataSource.sort = this.sort;
		});
	}
}
