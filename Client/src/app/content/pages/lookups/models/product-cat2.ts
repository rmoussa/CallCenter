import { BaseModel } from './_base.model';

export class ProductCat2 extends BaseModel {
	id: number;
	name: String;
	nameEn: String;
	firstCatId: number;

	clear() {
		this.id = 0;
		this.name = '';
		this.nameEn = '';
		this.firstCatId = 0;
	}
}
