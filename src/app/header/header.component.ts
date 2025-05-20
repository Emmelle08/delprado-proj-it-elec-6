import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "backend/authentication/auth.service"; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy { 
  public userIsAuthenticated = false;
  private authListenerSubs!: Subscription;
  isBullsTheme = false;

  constructor(public authService: AuthService) {}

  toggleTheme() {
  this.isBullsTheme = !this.isBullsTheme;
  if (this.isBullsTheme) {
    document.body.classList.add('bulls-background');
  } else {
    document.body.classList.remove('bulls-background');
  }
}

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout(){  
    this.authService.logout();
  }  
}