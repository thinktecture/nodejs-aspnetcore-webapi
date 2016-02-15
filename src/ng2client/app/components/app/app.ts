import {Component} from 'angular2/core';
import {RouteConfig, Route, RouterOutlet} from 'angular2/router';
import {LoginComponent} from '../login/login';

@Component({
    selector: 'nfn-app',
    templateUrl: 'app/components/app/app.html',
    styleUrls: ['css/purecss/pure.css'],
    directives: [RouterOutlet]
})
@RouteConfig([
    new Route({ path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true }),
])
export class AppComponent {

}
