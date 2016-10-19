import React, { Component } from 'react';
import { connect } from 'react-redux';
import bowser from 'bowser';
import _ from 'lodash';
import 'fullpage.js/jquery.fullPage.js';
import 'fullpage.js/jquery.fullPage.css';
import Utils from '../../common/utils';
import {
  changeLocale
} from './actions/index';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      localeName: 'zh-cn'
    }
  }

  componentDidMount(){
    this.initLocale();
    $('body').addClass('visible');
    $('#fullpage').fullpage({
      //Navigation
      menu: '#mo-navbar',
      lockAnchors: false,
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
      navigationPosition: 'right',
      navigationTooltips: ['firstSlide', 'secondSlide'],
      showActiveTooltip: false,
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      onLeave: function(index, nextIndex, direction){
        if (nextIndex != 1){
          $('.mo-navbar').addClass('mo-navbar--up');
        }
        else{
          $('.mo-navbar').removeClass('mo-navbar--up');
        }
      },
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
    console.log(this.props.locale);
    this.props.changeLocale(localeCookie);
  }

  handleLocaleChange(){
    let localeName = this.refs.localeName.value;
    this.setState({localeName});
    this.props.changeLocale(localeName);
    Utils.setCookie('locale', localeName, 10);
  }

  render() {
    let { locale } = this.props;
    let { localeName } = this.state;
    return(
      <div className="body">
        <div className="mo-navbar__nav-mobile mo-nav-mobile" role="navigation">
           <div className="mo-nav-mobile__mask"></div>
           <div className="mo-nav-mobile__content">
              <div className="mo-nav-mobile__menu-wrapper">
                 <ul className="mo-nav-mobile__menu mo-nav-mobile-menu" id="mo-navbar">
                    <li className="mo-nav-mobile-menu__item" data-menuanchor="home-section">
                      <a className="mo-nav-mobile-menu__link" href="#home-section" rel="nofollow">{locale.nav.home}</a>
                    </li>
                    <li className="mo-nav-mobile-menu__item" data-menuanchor="portfolio-section">
                      <a className="mo-nav-mobile-menu__link" href="#portfolio-section">{locale.user.signIn}</a>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
        <div className="mo-navbar" id="mo-navbar">
           <div className="mo-navbar__container">
              <span className="show-mobile mdi-icon mdi-edwardxiao white mobile-menu-icon"></span>
              <a className="mo-navbar__brand" href="#">
                <span className="mdi-icon mdi-edwardxiao main-logo white no-mobile"></span>
                <span className="show-mobile main-logo">
                  <span className="site-name">
                  {locale.site.edwardxiao}{locale.words.ss}{locale.words.hut}
                  </span>
                </span>
              </a>
              <div className="mo-navbar__nav mo-nav" id="menu">
                 <div className="mo-nav__item" data-menuanchor="home-section"><a className="nav-link" href="#home-section">{locale.nav.home}</a></div>
                 <div className="mo-nav__item mo-dropdown" data-menuanchor="logo-design-section">
                    <a className="mo-nav__link" href="#logo-design-section">{locale.nav.portfolio}</a>
                    <div className="mo-dropdown__menu">
                       <div className="mo-dropdown__item" data-menuanchor="logo-design-section"><a href="#logo-design-section">{locale.nav.logoDesign}</a></div>
                       <div className="mo-dropdown__item" data-menuanchor="graphic-design-section"><a href="#graphic-design-section">{locale.nav.graphicDesign}</a></div>
                       <div className="mo-dropdown__item" data-menuanchor="industrial-design-section"><a href="#industrial-design-section">{locale.nav.industrialDesign}</a></div>
                       <div className="mo-dropdown__item" data-menuanchor="web-design-section"><a href="#web-design-section">{locale.nav.webDesign}</a></div>
                       <div className="mo-dropdown__item" data-menuanchor="photograph-section"><a href="#photograph-section">{locale.nav.photograph}</a></div>
                    </div>
                 </div>
                 <div className="mo-nav__item" data-menuanchor="article-section"><a className="mo-nav__link" href="#article-section">{locale.nav.article}</a></div>
                 <div className="mo-nav__item" data-menuanchor="about-section"><a className="mo-nav__link" href="#about-section">{locale.nav.about}</a></div>
                 <div className="mo-nav__item" data-menuanchor="contact-section"><a className="mo-nav__link" href="#contact-section">{locale.nav.contact}</a></div>
              </div>
              <div className="mo-navbar__users">
                 <div className="mo-navbar__users-container">
                    <form className="locales-form" action="/" method="get">
                       <div className="form-group">
                          <select className="form-control input-sm" ref="localeName" onChange={this.handleLocaleChange.bind(this)} value={localeName}>
                             <option value="en">English</option>
                             <option value="zh-cn">中文</option>
                          </select>
                       </div>
                    </form>
                    <div className="mo-nav__item no-mobile-display"><a className="mo-nav__link" href="/users/sign_in">{locale.user.signIn}</a></div>
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
              <div className="section logo-design-section" data-anchor="logo-design-section">logo-design-section</div>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { locale } = state;
  return { locale };
}

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: (localeName) => {
      dispatch(changeLocale(localeName));
    }
  };
}

Index.propTypes = {
  locale: React.PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);