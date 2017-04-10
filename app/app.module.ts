/**
 * @author: Ravinder Kumar
 * This is entry point of application. This module is responsible for bootstraping
 * the application.
 */


import { NgModule,CUSTOM_ELEMENTS_SCHEMA }         from '@angular/core';
import { HttpModule }       from '@angular/http';
import { BrowserModule }    from '@angular/platform-browser';
import { AppComponent }     from './app.component';
import {ApiService} from './shared/apiService.service';

import './rxjs-extensions';

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent],//All the components
    providers:[ApiService],//all the services
    bootstrap:[AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule{}