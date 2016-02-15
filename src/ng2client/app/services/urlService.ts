import {Injectable} from 'angular2/core';

@Injectable()
export class UrlService {
    private _baseUrl: string = 'http://localhost';

    public get authorityUrl(): string {
        return `${this._baseUrl}:5001/connect/`;
    }

    public get apiUrl(): string {
        return `${this._baseUrl}:5000/api/`;
    }
}
