import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {}
