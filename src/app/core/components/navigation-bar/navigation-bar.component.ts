import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  menuItems: MenuItem[] | undefined;

  searchForm!: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.hasValidAuthToken() && this.authenticationService.isUserAuthenticated()) {
      this.menuItems = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/',
        },
        {
          label: 'Users',
          icon: 'pi pi-user',
          items: [
            {
              label: 'View',
              icon: 'pi pi-eye',
              routerLink: 'users',
            },
            {
              label: 'Create',
              icon: 'pi pi-plus',
              routerLink: 'users/create',
            },
          ]
        },
        {
          label: 'Golf Courses',
          icon: 'pi pi-flag',
          items: [
            {
              label: 'View',
              icon: 'pi pi-eye',
              routerLink: 'golfCourses',
            },
            {
              label: 'Create',
              icon: 'pi pi-plus',
              routerLink: 'golfCourses/create',
            },
          ]
        },
        {
          label: 'Scores',
          icon: 'pi pi-hashtag',
          items: [
            {
              label: 'View',
              icon: 'pi pi-eye',
              routerLink: 'scores',
            },
            {
              label: 'Create',
              icon: 'pi pi-plus',
              routerLink: 'scores/create',
            },
          ]
        },
      ];
    } else {
      this.menuItems = [
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          routerLink: '/login',
        },
        {
          label: 'Register',
          icon: 'pi pi-user-plus',
          routerLink: '/register',
        },
      ]
    }


    // this.searchForm = this.createSearchForm();
  }

  createSearchForm() {

  }

  onSearch(search?: string) {
    this.router.navigate(['discover', search],);
  }
}
