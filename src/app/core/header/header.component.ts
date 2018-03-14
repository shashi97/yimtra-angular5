import { Component, OnInit } from '@angular/core';
declare const $: any;
import { AuthService, SocialUser } from 'angularx-social-login';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Token } from '../login-modal-popup/shared/login.model';
import { CommonService } from '../../shared/services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  modal: boolean = false;
  modalStatus: string = '';
  public text: String;
  user: any;
  private subscription: Subscription;

  constructor(private localStorageService: LocalStorageService,
    private authService: AuthService, private commonService: CommonService) {
      console.log('header initilize');
  }

  ngOnInit() {
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'onSetHeader') {
        this.user = this.localStorageService.getUserDetail();
      }
    });
    this.user = this.localStorageService.getCurrentUser();
    console.log('My user object');
    console.log(this.user);
    $(document).ready(function () {

      'use strict';

      $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
      // Checks if li has sub (ul) and adds class for toggle icon - just an UI


      $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
      // Checks if drodown menu's li elements have anothere level (ul),
      // if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)

      $('.menu > ul').before('<a href=\'#\' class=\'menu-mobile\'>Navigation</a>');

      // Adds menu-mobile class (for mobile toggle menu) before the normal menu
      // Mobile menu is hidden if width is more then 959px, but normal menu is displayed
      // Normal menu is hidden if width is below 959px, and jquery adds mobile menu
      // Done this way so it can be used with wordpress without any trouble

      $('.menu > ul > li').hover(
        function (e) {
          if ($(window).width() > 943) {
            $(this).children('ul').fadeIn(150);
            e.preventDefault();
          }
        }, function (e) {
          if ($(window).width() > 943) {
            $(this).children('ul').fadeOut(150);
            e.preventDefault();
          }
        }
      );
      // If width is more than 943px dropdowns are displayed on hover

      $('.menu > ul > li').click(function () {
        if ($(window).width() < 943) {
          $(this).children('ul').fadeToggle(150);
        }
      });
      // If width is less or equal to 943px dropdowns are displayed on click (thanks Aman Jain from stackoverflow)

      $('.menu-mobile').click(function (e) {
        $('.menu > ul').toggleClass('show-on-mobile');
        e.preventDefault();
      });
      // when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story (thanks mwl from stackoverflow)

    });
    $(document).ready(function () {
      if (!$('.all-static').offset()) {
        return;
      }
      const stickyNavTop = $('.all-static').offset().top;
      const stickyNav = function () {
        const scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
          $('.all-static').addClass('fixed-header-all');
        } else {
          $('.all-static').removeClass('fixed-header-all');
        }
      };
      stickyNav();
      $(window).scroll(function () {
        stickyNav();
      });
    });

    $(document).ready(function () {
      if (!$('.slider-inn').offset()) {
        return;
      }
      const stickyNavTop = $('.slider-inn').offset().top;
      const stickyNav = function () {
        const scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
          $('.slider-inn').addClass('fixed-header1');
        } else {
          $('.slider-inn').removeClass('fixed-header1');
        }
      };
      stickyNav();
      $(window).scroll(function () {
        stickyNav();
      });
    });

    $(document).ready(function () {
      $('#hideshow').click(function () {
        $('#slcial-tab').toggle();
      });
    });

    $(document).ready(function () {
      $('.login-btn').click(function () {
        $('.login-div').toggle();
      });
    });
  }

  opemModal(modalStatus) {
    this.modalStatus = modalStatus;
    this.modal = true;
  }

  logout() {
    this.user = null;
    this.authService.signOut();
    this.localStorageService.removeLogin();
  }

  modalPopupEvent(result) {
    this.modal = result;
  }

}
