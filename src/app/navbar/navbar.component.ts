import { Component, OnInit } from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import { TokenStorageService } from '../_services/token-storage-service.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;

  constructor(private tokenStorage: TokenStorageService, private userService: UserService,  private router:Router) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
    
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/'])
  }

}
