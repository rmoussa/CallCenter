import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UnitComponent } from './unit/unit.component';
import { MatTableModule, MatSortModule } from '@angular/material';
import { UnitService } from './unit/unit.service';
import { HttpClientModule } from '@angular/common/http';
import { BranchComponent } from './branch/branch.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { CallCenterSourceComponent } from './call-center-source/call-center-source.component';
import { ProductCat1Component } from './product-cat1/product-cat1.component';

const routes: Routes = [
	{
		path: 'unit',
		component: UnitComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		HttpClientModule,
		MatTableModule,
		MatSortModule
	],
	declarations: [UnitComponent, BranchComponent, CustomerComponent, EmployeeComponent, CallCenterSourceComponent, ProductCat1Component],
	exports: [RouterModule],
	providers: [UnitService]
})
export class LookupsModule {}
