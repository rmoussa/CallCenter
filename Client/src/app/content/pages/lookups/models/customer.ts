import { BaseModel } from './_base.model';

export class Customer extends BaseModel {
	id: number;
	name: String;
	code: String;
	phone1: String;
	phone2: String;
	phone3: String;

	clear() {
		this.id = 0;
		this.name = '';
		this.code = '';
		this.phone1 = '';
		this.phone2 = '';
		this.phone3 = '';
	}
}
