import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {UrlService} from './urlService';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SecurityService {
    private _clientId: string = 'sample-client';
    private _clientSecret: string = 'sample-secret';

    private _token: string;
    private _user: string;

    constructor(private _http: Http,
                private _urlService: UrlService) {
    }

    public getAuthenticated(): boolean {
        return !!(this._token && this._user);
    }

    public get token(): string {
        return this._token;
    }

    public login(username: string, password: string): Observable<boolean> {
        const tokenEndpoint = `${this._urlService.authorityUrl}token`;
        const requestContent = `username=${username}&password=${password}&client_id=${this._clientId}&client_secret=${this._clientSecret}&grant_type=password&scope=api`;

        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(tokenEndpoint, requestContent, {
                headers: headers
            })
            .map(res => {
                const result = res.json();

                this._token = result.access_token;
                this._user = username;

                return true;
            }, () => false);
    }

    public logout(): void {
        this._user = undefined;
        this._token = undefined;
    }
}
