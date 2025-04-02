import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import HttpClient providers

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        // This ensures dynamic routes are rendered on the client side
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload'
      })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()) // Add HttpClient provider
  ]
};
