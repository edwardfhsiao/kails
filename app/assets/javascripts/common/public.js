import bowser from 'bowser';

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

$(document).on('change', '.locales-form .form-control', (evt) => {
  window.location = "/?locale=" + $(evt.target).val();
});

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