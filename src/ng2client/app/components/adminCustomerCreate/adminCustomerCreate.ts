import {Component} from 'angular2/core';
import {CustomerApiService} from '../../services/customerApiService';
import {Router} from 'angular2/router';

@Component({
    selector: 'nfn-admin-customer-create',
    templateUrl: 'app/components/adminCustomerCreate/adminCustomerCreate.html'
})
export class AdminCustomerCreateComponent {
    public firstName: string;
    public lastName: string;

    constructor(private _customerApiService: CustomerApiService, private _router: Router) {
    }

    private onSubmitted() {
        this._customerApiService.create(this.firstName, this.lastName)
            .subscribe(() => this._router.navigate(['AdminCustomers']));
    }
}
