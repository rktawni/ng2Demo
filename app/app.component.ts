import{Component, OnDestroy} from '@angular/core';
import{ApiService} from './shared/apiService.service';
import {ICurrencyData} from './model/currencyData';
import './rxjs-extensions';

@Component({
    selector:'demo-app',
    templateUrl:'app/app.component.html'
})
export class AppComponent implements OnDestroy{
    
    data: Array<ICurrencyData> = [];
    tempData:Array<ICurrencyData> = [];
    amtSortOrderAsc:boolean;
    accountSort:boolean;
    fullListLoaded:boolean;
    listLength:number = 3;
    // delcaring api service here will invoke service's constructor and will get initial data from server.
    constructor(private apiService: ApiService){       
        this.getData()
    }
    getData():void
    {
        this.apiService.getCurrencyData().subscribe(response=>{
            this.tempData = response;
            this.data = this.tempData.slice(0,3);
            this.sortOnAmount();
        },error=>{
            console.log("Error ", error);
        });
    }  
    sortOnAccount():void
    {
        this.accountSort = true;
        this.amtSortOrderAsc = !this.amtSortOrderAsc;
        this.tempData.sort((amt1,amt2)=>{
            if(Number(amt1.account.substring(4))>Number(amt2.account.substring(4)))
            {
                if (this.amtSortOrderAsc)
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
                
            }
            if(Number(amt1.account.substring(4))<Number(amt2.account.substring(4)))
            {
                if (this.amtSortOrderAsc)
                {
                    return -1;
                }
                else
                {
                    return 1;
                }
            }
            return 0;
        });
        this.data = this.tempData.slice(0,this.listLength);
    }  
    
    sortOnAmount():void
    {
        this.accountSort = false;
        this.amtSortOrderAsc = !this.amtSortOrderAsc;
        this.tempData.sort((amt1,amt2)=>{
            if(amt1.amount>amt2.amount)
            {
                if (this.amtSortOrderAsc)
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
                
            }
            if(amt1.amount<amt2.amount)
            {
                if (this.amtSortOrderAsc)
                {
                    return -1;
                }
                else
                {
                    return 1;
                }
            }
            return 0;
        });
        this.data = this.tempData.slice(0,this.listLength);
    }
    
    /**
     * return the color as change in currency.
     * Will return red if negative, green if positive, 
     * lightgray if no change.
     */
    getCurrencyColor(val):string
    {
        if(val[0] === '-')
        {
            return 'red';
        }
        if(val[0] === '+')
        {
            return 'green';
        }
        return 'lightgray';        
    }
    loadFullList():void
    {
        this.fullListLoaded = true;
        this.listLength = this.tempData.length;
        this.data = this.tempData.slice(0, this.tempData.length);
    }
    ngOnDestroy(){
        console.log("Main Component Destroyed");
    }
}
 