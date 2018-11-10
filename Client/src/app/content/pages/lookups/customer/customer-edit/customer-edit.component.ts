import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, forkJoin } from 'rxjs';
import {
	LayoutUtilsService,
	MessageType
} from '../../_core/utils/layout-utils.service';
import { Customer } from '../../models/customer';
import { CustomerService } from '../customer.service';

@Component({
	selector: 'm-customer-edit',
	templateUrl: './customer-edit.component.html',
	styleUrls: ['./customer-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerEditComponent implements OnInit {
	customer: Customer;
	oldCustomer: Customer;
	customerForm: FormGroup;
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$ = this.loadingSubject.asObservable();
	hasFormErrors: boolean;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private customerService: CustomerService,
		private layoutUtilsService: LayoutUtilsService,
		private myFB: FormBuilder
	) {}

	ngOnInit() {
		this.loadingSubject.next(true);
		this.activatedRoute.queryParams.subscribe(params => {
			const id = +params.id;
			if (id && id > 0) {
				this.customerService.getCustomerById(id).subscribe(res => {
					this.customer = res;
					this.oldCustomer = Object.assign({}, res);
					this.initCustomer();
				});
			} else {
				const newCustomer = new Customer();
				newCustomer.clear();
				this.customer = newCustomer;
				this.oldCustomer = Object.assign({}, newCustomer);
				this.initCustomer();
			}
		});
	}

	initCustomer() {
		this.createForm();
		this.loadingSubject.next(false);
	}

	createForm() {
		this.customerForm = this.myFB.group({
			id: [
				{ value: this.customer.id, disabled: true },
				Validators.required
			],
			name: [this.customer.name, Validators.required],
			code: [this.customer.code, Validators.required],
			phone1: [this.customer.phone1, Validators.required],
			phone2: [this.customer.phone2],
			phone3: [this.customer.phone3]
		});
	}

	getComponentTitle() {
		let result = 'Create product';
		if (!this.customer || !this.customer.id) {
			return result;
		}

		result = `Edit product - ${this.customer.id} ${this.customer.name}`;
		return result;
	}

	goBack(id = 0) {
		let _backUrl = 'lookups/customer';
		if (id > 0) {
			_backUrl += '?id=' + id;
		}
		this.router.navigateByUrl(_backUrl);
	}

	reset() {
		this.customer = Object.assign({}, this.oldCustomer);
		this.createForm();
		this.hasFormErrors = false;
		this.customerForm.markAsPristine();
		this.customerForm.markAsUntouched();
		this.customerForm.updateValueAndValidity();
	}

	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.customerForm.controls;
		/** check form */
		if (this.customerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			// this.selectedTab = 0;
			return;
		}

		// tslint:disable-next-line:prefer-const
		let editedCustomer = this.prepareCustomer();

		if (editedCustomer.id > 0) {
			this.updateCustomer(editedCustomer, withBack);
			return;
		}
		this.addCustomer(editedCustomer, withBack);
	}

	prepareCustomer(): Customer {
		const controls = this.customerForm.controls;
		const _customer = new Customer();
		_customer.id = this.customer.id;
		_customer.name = controls['name'].value;
		_customer.code = controls['code'].value;
		_customer.phone1 = controls['phone1'].value;
		_customer.phone2 = controls['phone2'].value;
		_customer.phone3 = controls['phone3'].value;
		return _customer;
	}

	updateCustomer(_customer: Customer, withBack: boolean = false) {
		this.loadingSubject.next(true);
		// Update Customer
		// tslint:disable-next-line:prefer-const
		let tasks$ = [this.customerService.updateCustomer(_customer)];

		forkJoin(tasks$).subscribe(res => {
			this.loadingSubject.next(false);
			if (withBack) {
				this.goBack(_customer.id);
			} else {
				const message = `Customer successfully has been saved.`;
				this.layoutUtilsService.showActionNotification(
					message,
					MessageType.Update,
					10000,
					true,
					false
				);
				this.refreshCustomer(_customer.id);
			}
		});
	}

	addCustomer(_product: Customer, withBack: boolean = false) {
		this.loadingSubject.next(true);
		this.customerService.createCustomer(_product).subscribe(res => {
			this.loadingSubject.next(false);
			if (withBack) {
				this.goBack(res.id);
			} else {
				const message = `New product successfully has been added.`;
				this.layoutUtilsService.showActionNotification(
					message,
					MessageType.Create,
					10000,
					true,
					false
				);
				this.refreshCustomer(res.id);
			}
		});
	}

	refreshCustomer(id = 0) {
		const _refreshUrl = 'lookups/customer/edit?id=' + id;
		this.router.navigateByUrl(_refreshUrl);
	}
}
