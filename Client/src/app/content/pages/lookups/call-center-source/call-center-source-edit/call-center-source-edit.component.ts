import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, forkJoin } from 'rxjs';
import {
	LayoutUtilsService,
	MessageType
} from '../../_core/utils/layout-utils.service';
import { CallCenterSource } from '../../models/call-center-source';
import { CallCenterSourceService } from '../call-center-source.service';


@Component({
  selector: 'm-call-center-source-edit',
  templateUrl: './call-center-source-edit.component.html',
  styleUrls: ['./call-center-source-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallCenterSourceEditComponent implements OnInit {
  callCenterSource: CallCenterSource;
	oldCallCenterSource: CallCenterSource;
	callCenterSourceForm: FormGroup;
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$ = this.loadingSubject.asObservable();
	hasFormErrors: boolean;
	selectedTab: number = 0;


	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private callCenterSourceService: CallCenterSourceService,
		private layoutUtilsService: LayoutUtilsService,
		private myFB: FormBuilder
	) {}

	ngOnInit() {
		this.loadingSubject.next(true);
		this.activatedRoute.queryParams.subscribe(params => {
			const id = +params.id;
			if (id && id > 0) {
				this.callCenterSourceService.getCallCenterSourceById(id).subscribe(res => {
					this.callCenterSource = res;
					this.oldCallCenterSource = Object.assign({}, res);
					this.initCallCenterSource();
				});
			} else {
				const newCallCenterSource = new CallCenterSource();
				newCallCenterSource.clear();
				this.callCenterSource = newCallCenterSource;
				this.oldCallCenterSource = Object.assign({}, newCallCenterSource);
				this.initCallCenterSource();
			}
		});
	}

	initCallCenterSource() {
		this.createForm();
		this.loadingSubject.next(false);
	}

	createForm() {
		this.callCenterSourceForm = this.myFB.group({
			id: [{ value: this.callCenterSource.id, disabled: true }, Validators.required],
			name: [this.callCenterSource.name, Validators.required],
			nameEn: [this.callCenterSource.nameEn, Validators.required]
		});
	}

	getComponentTitle() {
		let result = 'Create product';
		if (!this.callCenterSource || !this.callCenterSource.id) {
			return result;
		}

		result = `Edit product - ${this.callCenterSource.id} ${this.callCenterSource.name}`;
		return result;
	}

	goBack(id = 0) {
		let _backUrl = 'lookups/call-center-source';
		if (id > 0) {
			_backUrl += '?id=' + id;
		}
		this.router.navigateByUrl(_backUrl);
	}

	reset() {
		this.callCenterSource = Object.assign({}, this.oldCallCenterSource);
		this.createForm();
		this.hasFormErrors = false;
		this.callCenterSourceForm.markAsPristine();
		this.callCenterSourceForm.markAsUntouched();
		this.callCenterSourceForm.updateValueAndValidity();
	}

	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.callCenterSourceForm.controls;
		/** check form */
		if (this.callCenterSourceForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			// this.selectedTab = 0;
			return;
		}

		// tslint:disable-next-line:prefer-const
		let editedCallCenterSource = this.prepareCallCenterSource();

		if (editedCallCenterSource.id > 0) {
			this.updateCallCenterSource(editedCallCenterSource, withBack);
			return;
		}
		this.addCallCenterSource(editedCallCenterSource, withBack);
	}

	prepareCallCenterSource(): CallCenterSource {
		const controls = this.callCenterSourceForm.controls;
		const _callCenterSource = new CallCenterSource();
		_callCenterSource.id = this.callCenterSource.id;
		_callCenterSource.name = controls['name'].value;
		_callCenterSource.nameEn = controls['nameEn'].value;
		return _callCenterSource;
	}

	updateCallCenterSource(_callCenterSource: CallCenterSource, withBack: boolean = false) {
		this.loadingSubject.next(true);
		// Update CallCenterSource
		// tslint:disable-next-line:prefer-const
		let tasks$ = [this.callCenterSourceService.updateCallCenterSource(_callCenterSource)];

		forkJoin(tasks$).subscribe(res => {
			this.loadingSubject.next(false);
			if (withBack) {
				this.goBack(_callCenterSource.id);
			} else {
				const message = `CallCenterSource successfully has been saved.`;
				this.layoutUtilsService.showActionNotification(
					message,
					MessageType.Update,
					10000,
					true,
					false
				);
				this.refreshCallCenterSource(_callCenterSource.id);
			}
		});
	}

	addCallCenterSource(_product: CallCenterSource, withBack: boolean = false) {
		this.loadingSubject.next(true);
		this.callCenterSourceService.createCallCenterSource(_product).subscribe(res => {
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
				this.refreshCallCenterSource(res.id);
			}
		});
	}

	refreshCallCenterSource(id = 0) {
		const _refreshUrl = 'lookups/callCenterSource/edit?id=' + id;
		this.router.navigateByUrl(_refreshUrl);
	}
}
