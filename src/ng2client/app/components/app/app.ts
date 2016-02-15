import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Route, RouterOutlet} from 'angular2/router';
import {LoginComponent} from '../login/login';

@Component({
    selector: 'nfn-app',
    templateUrl: 'app/components/app/app.html',
    encapsulation: ViewEncapsulation.Native,
    directives: [RouterOutlet],
    styleUrls: ['css/purecss/pure.css']
})
@RouteConfig([
    new Route({ path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true }),
])
export class AppComponent {

}
