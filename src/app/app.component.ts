import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage-service.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:string = 'Every Cent';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string = '';
 
  constructor(private tokenStorageService: TokenStorageService) { }
 
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
 
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
 
      this.username = user.displayName;
    }
  }
 
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}