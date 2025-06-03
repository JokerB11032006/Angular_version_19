import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Removed environment import to fix lint error
// import { environment } from './environments/environment';

// Stagewise toolbar integration (dev only)
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  // Import dynamically to avoid production bundle impact
  import('@stagewise/toolbar').then(({ initToolbar }) => {
    const stagewiseConfig = { plugins: [] };
    initToolbar(stagewiseConfig);
  });
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
