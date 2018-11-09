import { ConfigModel } from '../core/interfaces/config';

export class PagesConfig implements ConfigModel {
	public config: any = {};

	constructor() {
		this.config = {
			'/': {
				page: {
					title: 'Dashboard',
					desc: 'Latest updates and statistic charts'
				}
			},
			builder: {
				page: { title: 'Layout Builder', desc: 'Layout builder' }
			},
			header: {
				actions: {
					page: { title: 'Actions', desc: 'actions example page' }
				}
			},
			profile: {
				page: { title: 'User Profile', desc: '' }
			},
			404: {
				page: { title: '404 Not Found', desc: '', subheader: false }
			},
			callcenter: {
				page: { title: 'Call Center', desc: 'Create & Manage Order' } // <= Page name and description
			},
			lookups: {
				unit: {
					page: { title: 'Units', desc: '' }
				},
				branch: {
					page: { title: 'Branches', desc: '' }
				},
				customer: {
					page: { title: 'Customers', desc: '' }
				},
				employee: {
					page: { title: 'Employees', desc: '' }
				},
				'call-center-source': {
					page: { title: 'Call Center Sources', desc: '' }
				},
				'product-cat1': {
					page: { title: 'Product Cat1', desc: '' }
				},
				'product-cat2': {
					page: { title: 'Product Cat2', desc: '' }
				},
				'product-cat3': {
					page: { title: 'Product Cat3', desc: '' }
				},
				'product-cat4': {
					page: { title: 'Product Cat4', desc: '' }
				}
			},
			reports: {
				'driver-reports': {
					page: { title: 'Driver Reports', desc: '' }
				}
			}
		};
	}
}
