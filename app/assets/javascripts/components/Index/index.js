import React, { Component } from 'react';
import { connect } from 'react-redux';
import bowser from 'bowser';
import _ from 'lodash';
import 'fullpage.js/dist/jquery.fullPage.min.css';
import 'fullpage.js/dist/jquery.fullPage.min.js';
import 'fullpage.js/dist/jquery.fullPage.extensions.min.js';
import 'bootstrap-sass/assets/javascripts/bootstrap/modal';
import 'bootstrap-sass/assets/javascripts/bootstrap/transition';
import Utils from '../../common/utils';
import LoginModal from './LoginModal/index';
import {
  changeLocale,
  login
} from './actions/index';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      localeName: 'zh-CN'
    }
  }

  componentDidMount(){
    this.initLocale();
    this.initFullPage();
    $('body').addClass('visible');
  }

  handleLoginClick(){
    $('#login-modal').modal();
  }

  initFullPage(){
    $('#fullpage').fullpage({
      //Navigation
      menu: '.mo-nav__menu',
      lockAnchors: true,
      anchors: [
        'home-section',
        'logo-design-section',
        'graphic-design-section',
        'industrial-design-section',
        'web-design-section',
        'photograph-section',
        'article-section',
        'about-section',
        'contact-section'
        ],
      navigation: false,
      //Scrolling
      css3: true,
      scrollingSpeed: 700,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 1000,
      scrollBar: false,
      easing: 'easeInOutCubic',
      easingcss3: 'ease',
      loopBottom: false,
      loopTop: false,
      normalScrollElements: '#login-modal, .mo-navbar__nav-mobile',
      onLeave: function(index, nextIndex, direction){
        if (nextIndex != 1){
          $('.mo-navbar').addClass('mo-navbar--up');
        }
        else{
          $('.mo-navbar').removeClass('mo-navbar--up');
        }
      },
      afterLoad: function(anchorLink, index){
        let active = false;
        $('.mo-dropdown__menu .mo-dropdown__item').map((key, item) => {
          if ($(item).hasClass('active')){
            active = true;
          }
        });
        if (active){
          $('.mo-nav__item.mo-dropdown').addClass('highlight');
        }
        else{
          $('.mo-nav__item.mo-dropdown').removeClass('highlight');
        }
      }
    });
  }

  initLocale(){
    let localeCookie = Utils.getCookie('locale');
    let localeName = this.state.localeName;
    if (_.isEmpty(localeCookie) || _.isUndefined(localeCookie)){
      Utils.setCookie('locale', localeName, 10);
      localeCookie = localeName;
    }
    else{
      this.setState({localeName: localeCookie});
    }
    this.props.changeLocale(localeCookie);
  }

  handleLocaleChange(){
    let localeName = this.refs.localeName.value;
    this.setState({localeName});
    this.props.changeLocale(localeName);
    Utils.setCookie('locale', localeName, 10);
  }

  goToSection(num){
    Utils.hideMobileMenu();
    if (num != 1){
      $('.mo-navbar').addClass('mo-navbar--up');
    }
    $.fn.fullpage.moveTo(num);
  }

  login(email, password){
    this.props.login(email, password);
  }

  render() {
    let {
      localeName,
      email,
      password
    } = this.state;
    let {
      locale,
      csrf,
      currentUser,
      isUserSignIn
    } = this.props;

    let userInfoHtml, userInfoHtmlMobile;
    if (isUserSignIn){
      userInfoHtml = (
        <div className="mo-nav__item no-mobile-display mo-dropdown" data-menuanchor="logo-design-section">
          <span className="user-info"><span className="glyphicon glyphicon-user white"></span>{currentUser.name}</span>
          <div className="mo-dropdown__menu mo-dropdown__menu--right-aligned">
             <div className="mo-dropdown__item"><a href="/users/logout">{locale.user.logout}</a></div>
          </div>
       </div>
      );
      userInfoHtmlMobile = (
        <div className="mo-nav__item"><a className="mo-nav__link" href="/users/logout">{locale.user.logout}</a></div>
      );
    }
    else{
      userInfoHtml = (
        <div className="mo-nav__item no-mobile-display"><a className="mo-nav__link" href="#" onClick={this.handleLoginClick.bind(this)}>{locale.user.signIn}</a></div>
      );
      userInfoHtmlMobile = (
        <div className="mo-nav__item"><a className="mo-nav__link" href="#" onClick={this.handleLoginClick.bind(this)}>{locale.user.signIn}</a></div>
      );
    }
    return(
      <div className="body">
        <div className="mo-navbar__nav-mobile mo-nav-mobile" role="navigation">
           <div className="mo-nav-mobile__mask"></div>
           <div className="mo-nav-mobile__content">
              <div className="mo-nav-mobile__menu-wrapper">
                  <div>
                    <span className="mdi-icon mdi-edwardxiao white"></span>
                  </div>
                  <br/>
                  {userInfoHtmlMobile}
                  <div className="mo-nav-mobile__menu mo-nav-mobile-menu mo-nav__menu">
                    <div className="mo-nav-mobile-menu__item" data-menuanchor="home-section">
                      <a className="mo-nav-mobile-menu__link" href="#home-section" rel="nofollow" onClick={this.goToSection.bind(this, 1)}>{locale.nav.home}</a>
                      <div className="line"></div>
                    </div>
                    <div className="mo-nav-mobile-menu__item" data-menuanchor="logo-design-section">
                      <a className="mo-nav-mobile-menu__link" href="#" rel="nofollow" onClick={this.goToSection.bind(this, 2)}>{locale.nav.logoDesign}</a>
                      <div className="line"></div>
                    </div>
                    <div className="mo-nav-mobile-menu__item" data-menuanchor="graphic-design-section">
                      <a className="mo-nav-mobile-menu__link" href="#" rel="nofollow" onClick={this.goToSection.bind(this, 3)}>{locale.nav.graphicDesign}</a>
                      <div className="line"></div>
                    </div>
                    <div className="mo-nav-mobile-menu__item" data-menuanchor="industrial-design-section">
                      <a className="mo-nav-mobile-menu__link" href="#" rel="nofollow" onClick={this.goToSection.bind(this, 4)}>{locale.nav.industrialDesign}</a>
                      <div className="line"></div>
                    </div>
                    <div className="mo-nav-mobile-menu__item" data-menuanchor="web-design-section">
                      <a className="mo-nav-mobile-menu__link" href="#" rel="nofollow" onClick={this.goToSection.bind(this, 5)}>{locale.nav.webDesign}</a>
                      <div className="line"></div>
                    </div>
                    <div className="mo-nav-mobile-menu__item" data-menuanchor="photograph-section">
                      <a className="mo-nav-mobile-menu__link" href="#" rel="nofollow" onClick={this.goToSection.bind(this, 6)}>{locale.nav.photograph}</a>
                      <div className="line"></div>
                    </div>
                    <div className="mo-nav-mobile-menu__item" data-menuanchor="article-section">
                      <a className="mo-nav-mobile-menu__link" href="#" rel="nofollow" onClick={this.goToSection.bind(this, 7)}>{locale.nav.article}</a>
                      <div className="line"></div>
                    </div>
                    <div className="mo-nav-mobile-menu__item" data-menuanchor="about-section">
                      <a className="mo-nav-mobile-menu__link" href="#" rel="nofollow" onClick={this.goToSection.bind(this, 8)}>{locale.nav.about}</a>
                      <div className="line"></div>
                    </div>
                    <div className="mo-nav-mobile-menu__item" data-menuanchor="contact-section">
                      <a className="mo-nav-mobile-menu__link" href="#" rel="nofollow" onClick={this.goToSection.bind(this, 9)}>{locale.nav.contact}</a>
                      <div className="line"></div>
                    </div>
                  </div>
              </div>
           </div>
        </div>
        <div className="mo-navbar">
           <div className="mo-navbar__container">
              <span className="show-mobile mdi-icon mdi-menu white mobile-menu-icon"></span>
              <a className="mo-navbar__brand" href="#">
                <span className="mdi-icon mdi-edwardxiao main-logo white no-mobile"></span>
                <span className="show-mobile main-logo">
                  <span className="site-name">
                  {locale.site.edwardxiao}{locale.words.ss}{locale.words.hut}
                  </span>
                </span>
              </a>
              <div className="mo-navbar__nav mo-nav mo-nav__menu">
                 <div className="mo-nav__item" data-menuanchor="home-section"><a className="nav-link" href="#home-section" onClick={this.goToSection.bind(this, 1)}>{locale.nav.home}</a></div>
                 <div className="mo-nav__item mo-dropdown" data-menuanchor="logo-design-section">
                    <a className="mo-nav__link" href="#logo-design-section" onClick={this.goToSection.bind(this, 2)}>{locale.nav.portfolio}</a>
                    <div className="mo-dropdown__menu">
                       <div className="mo-dropdown__item" data-menuanchor="logo-design-section"><a href="#" onClick={this.goToSection.bind(this, 2)}>{locale.nav.logoDesign}</a></div>
                       <div className="mo-dropdown__item" data-menuanchor="graphic-design-section"><a href="#" onClick={this.goToSection.bind(this, 3)}>{locale.nav.graphicDesign}</a></div>
                       <div className="mo-dropdown__item" data-menuanchor="industrial-design-section"><a href="#" onClick={this.goToSection.bind(this, 4)}>{locale.nav.industrialDesign}</a></div>
                       <div className="mo-dropdown__item" data-menuanchor="web-design-section"><a href="#" onClick={this.goToSection.bind(this, 5)}>{locale.nav.webDesign}</a></div>
                       <div className="mo-dropdown__item" data-menuanchor="photograph-section"><a href="#" onClick={this.goToSection.bind(this, 6)}>{locale.nav.photograph}</a></div>
                    </div>
                 </div>
                 <div className="mo-nav__item" data-menuanchor="article-section"><a className="mo-nav__link" href="#" onClick={this.goToSection.bind(this, 7)}>{locale.nav.article}</a></div>
                 <div className="mo-nav__item" data-menuanchor="about-section"><a className="mo-nav__link" href="#" onClick={this.goToSection.bind(this, 8)}>{locale.nav.about}</a></div>
                 <div className="mo-nav__item" data-menuanchor="contact-section"><a className="mo-nav__link" href="#" onClick={this.goToSection.bind(this, 9)}>{locale.nav.contact}</a></div>
              </div>
              <div className="mo-navbar__users">
                 <div className="mo-navbar__users-container">
                    <form className="locales-form" action="/" method="get">
                       <div className="form-group">
                          <select className="form-control input-sm" ref="localeName" onChange={this.handleLocaleChange.bind(this)} value={localeName}>
                             <option value="en-US">English</option>
                             <option value="zh-CN">中文</option>
                          </select>
                       </div>
                    </form>
                    {userInfoHtml}
                 </div>
              </div>
           </div>
        </div>
        <div className="container main">
           <div id="fullpage">
              <div className="section home-section" data-anchor="home-section">
                <div className="home-section__content">
                  efew
                </div>
              </div>
              <div className="section logo-design-section" data-anchor="logo-design-section">
              </div>
              <div className="section graphic-design-section" data-anchor="graphic-design-section">graphic-design-section</div>
              <div className="section industrial-design-section" data-anchor="industrial-design-section">industrial-design-section</div>
              <div className="section web-design-section" data-anchor="web-design-section">web-design-section</div>
              <div className="section photograph-design-section" data-anchor="photograph-design-section">photograph-design-section</div>
              <div className="section article-section" data-anchor="article-section">article-section</div>
              <div className="section about-section" data-anchor="about-section">about-section</div>
              <div className="section contact-section" data-anchor="contact-section">contact-section</div>
           </div>
           <div className="push"></div>
        </div>
        <div className="footer">
           <div className="container"></div>
        </div>
        <LoginModal
          titleText={locale.user.signIn}
          cancelText={locale.operation.cancel}
          emailText={locale.user.email}
          passwordText={locale.user.password}
          login={this.login.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: (localeName) => {
      dispatch(changeLocale(localeName));
    },
    login: (email, password) => {
      dispatch(login(email, password));
    }
  };
}

Index.propTypes = {
  locale: React.PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);