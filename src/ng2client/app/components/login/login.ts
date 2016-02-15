import {Component} from 'angular2/core';
import {SecurityService} from '../../services/securityService';

@Component({
    selector: 'nfn-login',
    templateUrl: 'app/components/login/login.html',
    styleUrls: ['app/components/login/login.css']
})
export class LoginComponent {
    private username: string;
    private password: string;

    constructor(private _securityService: SecurityService) {
    }

    public onSubmitted(): void {
        this._securityService.login(this.username, this.password)
            .subscribe(res => {
                if (res) {
                    return alert(this._securityService.token);
                }

                alert('Boh. Did not work yet');
            });
    }
}
