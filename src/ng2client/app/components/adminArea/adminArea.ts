import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, Route} from 'angular2/router';
import {NavigationComponent} from '../navigation/navigation';
import {AdminHomeComponent} from '../adminHome/adminHome';
import {AdminCustomerListComponent} from '../adminCustomerList/adminCustomerList';

@Component({
    selector: 'nfn-admin-area',
    templateUrl: 'app/components/adminArea/adminArea.html',
    directives: [RouterOutlet, NavigationComponent],
    styleUrls: ['app/components/adminArea/adminArea.css']
})
@RouteConfig([
    new Route({ path: '/home', name: 'AdminHome', component: AdminHomeComponent, useAsDefault: true }),
    new Route({ path: '/customers', name: 'AdminCustomers', component: AdminCustomerListComponent })
])
export class AdminAreaComponent {

}
