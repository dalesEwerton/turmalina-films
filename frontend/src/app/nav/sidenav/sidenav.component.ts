import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready( () => {

      $('#sidebarCollapse').on('click', () => {
        $('#sidebar').toggleClass('active');
      });
    });
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
  };

  isLoginRoute() {
    const urlRoute = window.location.href.split('/')[3];
    if(LOGGED_ROUTES.includes(urlRoute)) return false;
    else return true;
  }

}

const LOGGED_ROUTES = ['home', 'questionnarie'];
