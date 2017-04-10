import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ICurrencyData} from '../model/currencyData';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx'

@Injectable()
export class ApiService {

    constructor(private http: Http) {
       
    }
    
    getCurrencyData():Observable<ICurrencyData[]>
    {
        let url: string = '/api/currencyData.json';
        return this.http.get(url)
            .map((response: Response) => <ICurrencyData[]>response.json().currencyData)
            .do(this.consoleData)
            .catch(this.handleException);
    }
    private consoleData = (val: any): void => {
        console.log("Respones from Server: ", this.http);
    }

    private handleException = (err: any): any => {
        console.log("Error: ", err)
    }
}
