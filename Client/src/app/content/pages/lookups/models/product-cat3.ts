import { BaseModel } from './_base.model';

export class ProductCat3 extends BaseModel {
    id: number;
    name: String;
    nameEn: String;
    secondCatId: number;

    clear() {
		this.id = 0;
		this.name = '';
        this.nameEn = '';
        this.secondCatId = 0;
	}
}
