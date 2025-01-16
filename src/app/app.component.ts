import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'prjbuku';

  constructor(private authService: AuthService) {
    this.authService.autoAuthUser();
    
  }
}
