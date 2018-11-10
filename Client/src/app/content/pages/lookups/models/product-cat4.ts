import { BaseModel } from './_base.model';

export class ProductCat4 extends BaseModel {
    id: number;
    name: String;
    nameEn: String;
    thirdCatId: number;

    clear() {
		this.id = 0;
		this.name = '';
        this.nameEn = '';
        this.thirdCatId = 0;
	}

}
