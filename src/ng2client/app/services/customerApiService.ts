import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {SecurityService} from './securityService';
import {Observable} from 'rxjs/Observable';
import {CustomerModel} from '../model/customerModel';
import {UrlService} from './urlService';

@Injectable()
export class CustomerApiService {
    constructor(private _http: Http, private _securityService: SecurityService, private _urlService: UrlService) {
    }

    public list(): Observable<Array<CustomerModel>> {
        const headers = this.createHeaders();
        const endpoint = `${this._urlService.apiUrl}customer/list`;

        return this._http.get(endpoint, {
            headers: headers
        })
            .map(response => response.json());

        // For later :)
            /*.flatMap((customers: Array<CustomerModel>) => {
                const mapped = [];

                customers.forEach((customer: CustomerModel) => mapped.push(this._http.get('http://uifaces.com/api/v1/random')
                    .map(uiFaces => {
                        var result = uiFaces.json();
                        customer.userImageUrl = result.image_urls.bigger;

                        return customer;
                    })));

                return Observable.from(mapped);
            })
            .toArray();*/
    }

    public remove(userId: number): Observable {
        const headers = this.createHeaders();
        const endpoint = `${this._urlService.apiUrl}customer/${userId}`;

        return this._http.delete(endpoint, {
            headers: headers
        });
    }

    private createHeaders(): Headers {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${this._securityService.token}`);
        return headers;
    }

}
