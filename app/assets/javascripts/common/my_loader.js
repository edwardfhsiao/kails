import Spinner from 'spin.js';

class MyLoader {
  constructor() {

  }

  initLazyLoadingImage(bLazyId, spinLoaderId, spinnerOpt) {
    let Blazy = require('blazy');
    this.revalidate(bLazyId);
    this.initSpin(spinLoaderId, spinnerOpt);
    this.initLazyImage(Blazy);
  }

  initLazyImage(Blazy) {
    new Blazy({
      success: (element) => {
        setTimeout(() => {
          let $parent;
          $parent = element.parentNode;
          $parent.className = $parent.className.replace(/\bloading\b/, '');
          let $spinLoader = $($parent).find('.spin-loader');
          $spinLoader.data('spinner').stop();
          $spinLoader.html('');
          return;
        }, 200)
        return;
      }
    });
  }

  initSpin(spinLoaderId, spinnerOpt) {
    let $el = document.getElementById(spinLoaderId);
    let spinner = new Spinner(spinnerOpt).spin($el);
    $($el).data('spinner', spinner);
  }

  stopSpin(spinLoaderId){
    $('#' + spinLoaderId).data('spinner').stop();
  }

  revalidate(bLazyId) {
    $('#' + bLazyId).removeClass('b-loaded');
  }
}

export default MyLoader;