import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {CustomerModel} from '../../model/customerModel';
import {CustomerApiService} from '../../services/customerApiService';

@Component({
    selector: 'nfn-admin-customer-list-item',
    templateUrl: 'app/components/adminCustomerListItem/adminCustomerListItem.html'
})
export class AdminCustomerListItemComponent {
    @Input()
    public customer: CustomerModel;

    @Input()
    public active: boolean;

    @Output()
    public onDeleted: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _customerApiService: CustomerApiService) {
    }

    private removeCustomer() {
        this._customerApiService.remove(this.customer.id)
            .subscribe(() => this.onDeleted.emit(null));
    }
}
