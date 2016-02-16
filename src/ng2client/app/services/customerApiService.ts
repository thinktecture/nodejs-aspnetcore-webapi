import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {SecurityService} from './securityService';

@Injectable()
export class CustomerApiService {
    constructor(private _http: Http, private _securityService: SecurityService) {
    }


}
