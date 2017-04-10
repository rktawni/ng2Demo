import {enableProdMode} from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';


/**
 * 'bootstrap' function initiates the application. It is an Angular2 function.
 */
const platform = platformBrowserDynamic();
enableProdMode();
platform.bootstrapModule(AppModule);