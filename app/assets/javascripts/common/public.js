import bowser from 'bowser';
import _ from 'lodash';
import Config from '../config';
import Utils from './utils';

let localeCookie = Utils.getCookie('locale');
let localeName = Config.localeName;
if (_.isEmpty(localeCookie) || _.isUndefined(localeCookie)){
  Utils.setCookie('locale', localeName, 10);
  localeCookie = localeName;
}
window.localeName = localeCookie;

if (bowser.msie && bowser.version <= 8) {
  require('es5-shim');
  require('es5-shim/es5-sham');
}

$(document).on('click', '.mobile-menu-icon', () => {
  $('.mo-navbar__nav-mobile.mo-nav-mobile').addClass('visible');
});

$(document).on('click', '.mo-nav-mobile__mask', () => {
  $('.mo-navbar__nav-mobile.mo-nav-mobile').removeClass('visible');
});

// $(document).on('change', '.locales-form .form-control', (evt) => {
//   let locale = Utils.urlParam('locale');
//   let url = window.location.href;
//   let val = $(evt.target).val();
//   if (_.isNull(locale)){
//     window.location = url + '?locale=' + val;
//   }
//   else{
//     let newUrl = url.replace('locale=' + locale, 'locale=' + val);
//     window.location = newUrl;
//   }
// });

$(window).scroll(function() {
  var currentScrollHight, targetScrollHight;
  currentScrollHight = $(window).scrollTop();
  targetScrollHight = 20;
  if (currentScrollHight > targetScrollHight - 10) {
    $('.mo-navbar').addClass('mo-navbar--up');
  } else {
    $('.mo-navbar').removeClass('mo-navbar--up');
  }
});