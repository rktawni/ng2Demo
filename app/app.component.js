"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var apiService_service_1 = require('./shared/apiService.service');
require('./rxjs-extensions');
var AppComponent = (function () {
    // delcaring api service here will invoke service's constructor and will get initial data from server.
    function AppComponent(apiService) {
        this.apiService = apiService;
        this.data = [];
        this.tempData = [];
        this.listLength = 3;
        this.getData();
    }
    AppComponent.prototype.getData = function () {
        var _this = this;
        this.apiService.getCurrencyData().subscribe(function (response) {
            _this.tempData = response;
            _this.data = _this.tempData.slice(0, 3);
            _this.sortOnAmount();
        }, function (error) {
            console.log("Error ", error);
        });
    };
    AppComponent.prototype.sortOnAccount = function () {
        var _this = this;
        this.accountSort = true;
        this.amtSortOrderAsc = !this.amtSortOrderAsc;
        this.tempData.sort(function (amt1, amt2) {
            if (Number(amt1.account.substring(4)) > Number(amt2.account.substring(4))) {
                if (_this.amtSortOrderAsc) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            if (Number(amt1.account.substring(4)) < Number(amt2.account.substring(4))) {
                if (_this.amtSortOrderAsc) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            return 0;
        });
        this.data = this.tempData.slice(0, this.listLength);
    };
    AppComponent.prototype.sortOnAmount = function () {
        var _this = this;
        this.accountSort = false;
        this.amtSortOrderAsc = !this.amtSortOrderAsc;
        this.tempData.sort(function (amt1, amt2) {
            if (amt1.amount > amt2.amount) {
                if (_this.amtSortOrderAsc) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            if (amt1.amount < amt2.amount) {
                if (_this.amtSortOrderAsc) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            return 0;
        });
        this.data = this.tempData.slice(0, this.listLength);
    };
    /**
     * return the color as change in currency.
     * Will return red if negative, green if positive,
     * lightgray if no change.
     */
    AppComponent.prototype.getCurrencyColor = function (val) {
        if (val[0] === '-') {
            return 'red';
        }
        if (val[0] === '+') {
            return 'green';
        }
        return 'lightgray';
    };
    AppComponent.prototype.loadFullList = function () {
        this.fullListLoaded = true;
        this.listLength = this.tempData.length;
        this.data = this.tempData.slice(0, this.tempData.length);
    };
    AppComponent.prototype.ngOnDestroy = function () {
        console.log("Main Component Destroyed");
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'demo-app',
            templateUrl: 'app/app.component.html'
        }), 
        __metadata('design:paramtypes', [apiService_service_1.ApiService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map