import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Branch } from '../../models/branch';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../branch.service';
import {
	LayoutUtilsService,
	MessageType
} from '../../_core/utils/layout-utils.service';

@Component({
	selector: 'm-branch-edit',
	templateUrl: './branch-edit.component.html',
	styleUrls: ['./branch-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchEditComponent implements OnInit {
	branch: Branch;
	oldBranch: Branch;
	branchForm: FormGroup;
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$ = this.loadingSubject.asObservable();
	hasFormErrors: boolean;
	selectedTab: number = 0;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private branchService: BranchService,
		private layoutUtilsService: LayoutUtilsService,
		private myFB: FormBuilder
	) {}

	ngOnInit() {
		this.loadingSubject.next(true);
		this.activatedRoute.queryParams.subscribe(params => {
			const id = +params.id;
			if (id && id > 0) {
				this.branchService.getBranchById(id).subscribe(res => {
					this.branch = res;
					this.oldBranch = Object.assign({}, res);
					this.initBranch();
				});
			} else {
				const newBranch = new Branch();
				newBranch.clear();
				this.branch = newBranch;
				this.oldBranch = Object.assign({}, newBranch);
				this.initBranch();
			}
		});
	}

	initBranch() {
		this.createForm();
		this.loadingSubject.next(false);
	}

	createForm() {
		this.branchForm = this.myFB.group({
			id: [
				{ value: this.branch.id, disabled: true },
				Validators.required
			],
			name: [this.branch.name, Validators.required],
			nameEn: [this.branch.nameEn, Validators.required]
		});
	}

	getComponentTitle() {
		let result = 'Create product';
		if (!this.branch || !this.branch.id) {
			return result;
		}

		result = `Edit product - ${this.branch.id} ${this.branch.name}`;
		return result;
	}

	goBack(id = 0) {
		let _backUrl = 'lookups/branch';
		if (id > 0) {
			_backUrl += '?id=' + id;
		}
		this.router.navigateByUrl(_backUrl);
	}

	reset() {
		this.branch = Object.assign({}, this.oldBranch);
		this.createForm();
		this.hasFormErrors = false;
		this.branchForm.markAsPristine();
		this.branchForm.markAsUntouched();
		this.branchForm.updateValueAndValidity();
	}

	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.branchForm.controls;
		/** check form */
		if (this.branchForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			// this.selectedTab = 0;
			return;
		}

		// tslint:disable-next-line:prefer-const
		let editedBranch = this.prepareBranch();

		if (editedBranch.id > 0) {
			this.updateBranch(editedBranch, withBack);
			return;
		}
		this.addBranch(editedBranch, withBack);
	}

	prepareBranch(): Branch {
		const controls = this.branchForm.controls;
		const _branch = new Branch();
		_branch.id = this.branch.id;
		_branch.name = controls['name'].value;
		_branch.nameEn = controls['nameEn'].value;
		return _branch;
	}

	updateBranch(_branch: Branch, withBack: boolean = false) {
		this.loadingSubject.next(true);
		// Update Branch
		// tslint:disable-next-line:prefer-const
		let tasks$ = [this.branchService.updateBranch(_branch)];

		forkJoin(tasks$).subscribe(res => {
			this.loadingSubject.next(false);
			if (withBack) {
				this.goBack(_branch.id);
			} else {
				const message = `Branch successfully has been saved.`;
				this.layoutUtilsService.showActionNotification(
					message,
					MessageType.Update,
					10000,
					true,
					false
				);
				this.refreshBranch(_branch.id);
			}
		});
	}

	addBranch(_product: Branch, withBack: boolean = false) {
		this.loadingSubject.next(true);
		this.branchService.createBranch(_product).subscribe(res => {
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
				this.refreshBranch(res.id);
			}
		});
	}

	refreshBranch(id = 0) {
		const _refreshUrl = 'lookups/branch/edit?id=' + id;
		this.router.navigateByUrl(_refreshUrl);
	}
}
