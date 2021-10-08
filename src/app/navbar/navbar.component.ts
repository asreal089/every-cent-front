import { Component, OnInit } from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import { TokenStorageService } from '../_services/token-storage-service.service';
import { UserService } from '../_services/user.service';



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

  constructor(private tokenStorage: TokenStorageService, private userService: UserService) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
    console.log("olar esse é o usuario: " + this.currentUser)
    console.log("olar esse é o role: " + this.currentUser)

  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
