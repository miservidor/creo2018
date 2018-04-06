import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { GoogleApiService } from './app/google-maps/shared/google-api.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
