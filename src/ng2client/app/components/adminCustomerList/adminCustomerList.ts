import {Component, OnInit} from 'angular2/core';
import {AdminCustomerListItemComponent} from '../adminCustomerListItem/adminCustomerListItem';
import {CustomerModel} from '../../model/customerModel';
import {CustomerApiService} from '../../services/customerApiService';

@Component({
    selector: 'nfn-admin-customer-list',
    templateUrl: 'app/components/adminCustomerList/adminCustomerList.html',
    directives: [AdminCustomerListItemComponent],
    styleUrls: ['app/components/adminCustomerList/adminCustomerList.css']
})
export class AdminCustomerListComponent implements OnInit {
    public customers: Array<CustomerModel> = [];

    constructor(private _customerApiService: CustomerApiService) {
    }

    ngOnInit(): any {
        this._customerApiService.list()
            .subscribe(res => this.customers = res);
    }
}
