import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
              label: 'Home',
              icon: 'pi pi-home',
              routerLink: '/'
            },
            {
              label: 'Users',
              icon: 'pi pi-user',
              items: [
                {
                  label: 'View Users',
                  icon: 'pi pi-eye',
                  routerLink: 'users',
                },
                {
                  label: 'Create User',
                  icon: 'pi pi-plus',
                  routerLink: 'createUser'
                }
              ]
            },
        ];
    }
}
