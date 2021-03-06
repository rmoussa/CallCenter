import { BaseModel } from './_base.model';

export class Employee extends BaseModel {
	id: number;
	name: String;
	nameEn: String;
	jobId: number;

	clear() {
		this.id = 0;
		this.name = '';
		this.nameEn = '';
		this.jobId = 0;
	}
}
