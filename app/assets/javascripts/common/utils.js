let utils = {
  urlParam: (name) => {
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
  },
  setCookie: (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires='+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  },
  getCookie: (cname) => {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length,c.length);
      }
    }
    return '';
  },
  hideMobileMenu: () => {
    $('.mo-navbar__nav-mobile.mo-nav-mobile').removeClass('visible');
  }
}

export default utils;