import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitService } from '../unit.service';
import { Unit } from '../../models/unit';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, forkJoin } from 'rxjs';
import {
	LayoutUtilsService,
	MessageType
} from '../../_core/utils/layout-utils.service';

@Component({
	selector: 'm-unit-edit',
	templateUrl: './unit-edit.component.html',
	styleUrls: ['./unit-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitEditComponent implements OnInit {
	unit: Unit;
	oldUnit: Unit;
	unitForm: FormGroup;
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$ = this.loadingSubject.asObservable();
	hasFormErrors: boolean;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private unitService: UnitService,
		private layoutUtilsService: LayoutUtilsService,
		private myFB: FormBuilder
	) {}

	ngOnInit() {
		this.loadingSubject.next(true);
		this.activatedRoute.queryParams.subscribe(params => {
			const id = +params.id;
			if (id && id > 0) {
				this.unitService.getUnitById(id).subscribe(res => {
					this.unit = res;
					this.oldUnit = Object.assign({}, res);
					this.initUnit();
				});
			} else {
				const newUnit = new Unit();
				newUnit.clear();
				this.unit = newUnit;
				this.oldUnit = Object.assign({}, newUnit);
				this.initUnit();
			}
		});
	}

	initUnit() {
		this.createForm();
		this.loadingSubject.next(false);
	}

	createForm() {
		this.unitForm = this.myFB.group({
			id: [{ value: this.unit.id, disabled: true }, Validators.required],
			name: [this.unit.name, Validators.required],
			nameEn: [this.unit.nameEn, Validators.required]
		});
	}

	getComponentTitle() {
		let result = 'Create product';
		if (!this.unit || !this.unit.id) {
			return result;
		}

		result = `Edit product - ${this.unit.id} ${this.unit.name}`;
		return result;
	}

	goBack(id = 0) {
		let _backUrl = 'lookups/unit';
		if (id > 0) {
			_backUrl += '?id=' + id;
		}
		this.router.navigateByUrl(_backUrl);
	}

	reset() {
		this.unit = Object.assign({}, this.oldUnit);
		this.createForm();
		this.hasFormErrors = false;
		this.unitForm.markAsPristine();
		this.unitForm.markAsUntouched();
		this.unitForm.updateValueAndValidity();
	}

	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.unitForm.controls;
		/** check form */
		if (this.unitForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			// this.selectedTab = 0;
			return;
		}

		// tslint:disable-next-line:prefer-const
		let editedUnit = this.prepareUnit();

		if (editedUnit.id > 0) {
			this.updateUnit(editedUnit, withBack);
			return;
		}
		this.addUnit(editedUnit, withBack);
	}

	prepareUnit(): Unit {
		const controls = this.unitForm.controls;
		const _unit = new Unit();
		_unit.id = this.unit.id;
		_unit.name = controls['name'].value;
		_unit.nameEn = controls['nameEn'].value;
		return _unit;
	}

	updateUnit(_unit: Unit, withBack: boolean = false) {
		this.loadingSubject.next(true);
		// Update Unit
		// tslint:disable-next-line:prefer-const
		let tasks$ = [this.unitService.updateUnit(_unit)];

		forkJoin(tasks$).subscribe(res => {
			this.loadingSubject.next(false);
			if (withBack) {
				this.goBack(_unit.id);
			} else {
				const message = `Unit successfully has been saved.`;
				this.layoutUtilsService.showActionNotification(
					message,
					MessageType.Update,
					10000,
					true,
					false
				);
				this.refreshUnit(_unit.id);
			}
		});
	}

	addUnit(_product: Unit, withBack: boolean = false) {
		this.loadingSubject.next(true);
		this.unitService.createUnit(_product).subscribe(res => {
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
				this.refreshUnit(res.id);
			}
		});
	}

	refreshUnit(id = 0) {
		const _refreshUrl = 'lookups/unit/edit?id=' + id;
		this.router.navigateByUrl(_refreshUrl);
	}
}
