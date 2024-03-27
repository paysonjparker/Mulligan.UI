import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  menuItems: MenuItem[] | undefined;

  ngOnInit() {
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
      // {
      //   label: 'Add Post',
      //   icon: 'pi pi-pencil',
      //   routerLink: 'posts/create',
      // },
    ]
  }
}
