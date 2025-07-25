import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
 standalone: true,
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular_v19';
}
