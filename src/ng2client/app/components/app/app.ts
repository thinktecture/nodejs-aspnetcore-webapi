import {Component} from 'angular2/core';
import {RouteConfig, Route, RouterOutlet} from 'angular2/router';
import 'rxjs/Rx';

import {LoginComponent} from '../login/login';
import {APP_SERVICES} from '../../services/services';
import {AdminAreaComponent} from '../adminArea/adminArea';

@Component({
    selector: 'nfn-app',
    templateUrl: 'app/components/app/app.html',
    directives: [RouterOutlet],
    providers: APP_SERVICES
})
@RouteConfig([
    new Route({ path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true }),
    new Route({ path: '/admin/...', name: 'AdminArea', component: AdminAreaComponent })
])
export class AppComponent {
}
