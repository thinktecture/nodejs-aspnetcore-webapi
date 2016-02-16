import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {SecurityService} from '../../services/securityService';

@Component({
    selector: 'nfn-navigation',
    templateUrl: 'app/components/navigation/navigation.html',
    styleUrls: ['app/components/navigation/navigation.css'],
    directives: [RouterLink]
})
export class NavigationComponent {
    constructor(private _securityService: SecurityService, private _router: Router) {
    }

    public logout() {
        this._securityService.logout();
        this._router.navigate(['Login']);
    }
}
