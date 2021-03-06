import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UnitComponent } from './unit/unit.component';
import {
	MatTableModule,
	MatSortModule,
	MatInputModule,
	MatButtonModule,
	MatMenuModule,
	MatSelectModule,
	MatAutocompleteModule,
	MatRadioModule,
	MatIconModule,
	MatNativeDateModule,
	MatProgressBarModule,
	MatDatepickerModule,
	MatCardModule,
	MatPaginatorModule,
	MatCheckboxModule,
	MatProgressSpinnerModule,
	MatSnackBarModule,
	MatTabsModule,
	MatTooltipModule,
	MatDialogModule
} from '@angular/material';
import { UnitService } from './unit/unit.service';
import { HttpClientModule } from '@angular/common/http';
import { BranchComponent } from './branch/branch.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { CallCenterSourceComponent } from './call-center-source/call-center-source.component';
import { ProductCat1Component } from './product-cat1/product-cat1.component';
import { ProductCat2Component } from './product-cat2/product-cat2.component';
import { ProductCat3Component } from './product-cat3/product-cat3.component';
import { ProductCat4Component } from './product-cat4/product-cat4.component';
import { BranchService } from './branch/branch.service';
import { CustomerService } from './customer/customer.service';
import { EmployeeService } from './employee/employee.service';
import { CallCenterSourceService } from './call-center-source/call-center-source.service';
import { ProductCat1Service } from './product-cat1/product-cat1.service';
import { ProductCat2Service } from './product-cat2/product-cat2.service';
import { ProductCat3Service } from './product-cat3/product-cat3.service';
import { ProductCat4Service } from './product-cat4/product-cat4.service';
import { UnitEditComponent } from './unit/unit-edit/unit-edit.component';
import { PartialsModule } from '../../partials/partials.module';
import { HttpUtilsService } from '../../../core/services/http-utils.service';
import { LayoutUtilsService } from './_core/utils/layout-utils.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertComponent } from './_shared/alert/alert.component';
import { ActionNotificationComponent } from './_shared/action-natification/action-notification.component';
import { DeleteEntityDialogComponent } from './_shared/delete-entity-dialog/delete-entity-dialog.component';
import { BranchEditComponent } from './branch/branch-edit/branch-edit.component';
import { CallCenterSourceEditComponent } from './call-center-source/call-center-source-edit/call-center-source-edit.component';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { ProductCat1EditComponent } from './product-cat1/product-cat1-edit/product-cat1-edit.component';
import { ProductCat2EditComponent } from './product-cat2/product-cat2-edit/product-cat2-edit.component';
import { ProductCat3EditComponent } from './product-cat3/product-cat3-edit/product-cat3-edit.component';
import { ProductCat4EditComponent } from './product-cat4/product-cat4-edit/product-cat4-edit.component';
import { UpdateStatusDialogComponent } from './_shared/update-status-dialog/update-status-dialog.component';
import { FetchEntityDialogComponent } from './_shared/fetch-entity-dialog/fetch-entity-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
	{
		path: 'unit',
		component: UnitComponent
	},
	{
		path: 'unit/add',
		component: UnitEditComponent
	},
	{
		path: 'unit/edit',
		component: UnitEditComponent
	},
	{
		path: 'unit/edit/:id',
		component: UnitEditComponent
	},
	{
		path: 'branch',
		component: BranchComponent
	},
	{
		path: 'branch/add',
		component: BranchEditComponent
	},
	{
		path: 'branch/edit',
		component: BranchEditComponent
	},
	{
		path: 'branch/edit/:id',
		component: BranchEditComponent
	},
	{
		path: 'customer',
		component: CustomerComponent
	},
	{
		path: 'customer/add',
		component: CustomerEditComponent
	},
	{
		path: 'customer/edit',
		component: CustomerEditComponent
	},
	{
		path: 'customer/edit/:id',
		component: CustomerEditComponent
	},
	{
		path: 'employee',
		component: EmployeeComponent
	},
	{
		path: 'call-center-source',
		component: CallCenterSourceComponent
	},
	{
		path: 'callCenterSource/add',
		component: CallCenterSourceEditComponent
	},
	{
		path: 'callCenterSource/edit',
		component: CallCenterSourceEditComponent
	},
	{
		path: 'callCenterSource/edit/:id',
		component: CallCenterSourceEditComponent
	},
	{
		path: 'product-cat1',
		component: ProductCat1Component
	},
	{
		path: 'product-cat2',
		component: ProductCat2Component
	},
	{
		path: 'product-cat3',
		component: ProductCat3Component
	},
	{
		path: 'product-cat4',
		component: ProductCat4Component
	}
];

@NgModule({
	imports: [
		MatDialogModule,
		CommonModule,
		RouterModule.forChild(routes),
		HttpClientModule,
		PartialsModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		PartialsModule
	],
	entryComponents: [
		ActionNotificationComponent,
		DeleteEntityDialogComponent
		// FetchEntityDialogComponent,
		// UpdateStatusDialogComponent
	],
	declarations: [
		UnitComponent,
		BranchComponent,
		CustomerComponent,
		EmployeeComponent,
		CallCenterSourceComponent,
		ProductCat1Component,
		ProductCat2Component,
		ProductCat3Component,
		ProductCat4Component,
		UnitEditComponent,
		AlertComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		BranchEditComponent,
		CallCenterSourceEditComponent,
		CustomerEditComponent,
		EmployeeEditComponent,
		ProductCat1EditComponent,
		ProductCat2EditComponent,
		ProductCat3EditComponent,
		ProductCat4EditComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent
	],
	exports: [RouterModule],
	providers: [
		UnitService,
		BranchService,
		CustomerService,
		EmployeeService,
		CallCenterSourceService,
		ProductCat1Service,
		ProductCat2Service,
		ProductCat3Service,
		ProductCat4Service,
		HttpUtilsService,
		LayoutUtilsService
	]
})
export class LookupsModule {}
