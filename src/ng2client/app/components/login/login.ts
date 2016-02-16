import {Component} from 'angular2/core';
import {SecurityService} from '../../services/securityService';
import {Router} from 'angular2/router';

@Component({
    selector: 'nfn-login',
    templateUrl: 'app/components/login/login.html',
    styleUrls: ['app/components/login/login.css']
})
export class LoginComponent {
    private username: string;
    private password: string;

    constructor(private _securityService: SecurityService, private _router: Router) {
    }

    public onSubmitted(): void {
        this._securityService.login(this.username, this.password)
            .subscribe(res => {
                if (res) {
                    this._router.navigate(['AdminArea']);
                }
            });
    }
}
