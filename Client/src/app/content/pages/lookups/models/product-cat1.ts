import { BaseModel } from './_base.model';

export class ProductCat1 extends BaseModel {
    id: number;
    name: String;
    nameEn: String;

    clear() {
		this.id = 0;
		this.name = '';
		this.nameEn = '';
	}
}
