import {Component, Input} from 'angular2/core';
import {CustomerModel} from '../../model/customerModel';

@Component({
    selector: 'nfn-admin-customer-list-item',
    templateUrl: 'app/components/adminCustomerListItem/adminCustomerListItem.html',
    styleUrls: ['app/components/adminCustomerListItem/adminCustomerListItem.css']
})
export class AdminCustomerListItemComponent {
    @Input()
    public customer: CustomerModel;
}
