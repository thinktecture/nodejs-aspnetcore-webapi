import {Component, OnInit} from 'angular2/core';
import {CustomerModel} from '../../model/customerModel';
import {CustomerApiService} from '../../services/customerApiService';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'nfn-admin-customer-list',
    templateUrl: 'app/components/adminCustomerList/adminCustomerList.html',
    directives: [RouterLink]
})
export class AdminCustomerListComponent implements OnInit {
    public customers: Array<CustomerModel> = [];

    public selectedCustomer: CustomerModel;

    constructor(private _customerApiService: CustomerApiService) {
    }

    ngOnInit(): any {
        this.refresh();
    }

    private refresh() {
        this._customerApiService.list()
            .subscribe(res => {
                this.customers = res;
                this.selectedCustomer = undefined;
            });
    }
}
