import Message from '../../../common/my_message';
import Validator from '../../../common/my_validator';
import { PATH } from '../../../common/path';
import { polyfill } from 'es6-promise';
polyfill();
let message = new Message();
let validator = new Validator();

export const SET_LOCALE = 'SET_LOCALE';
export const setLocale = (locale) => ({
  type: SET_LOCALE,
  locale
});

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  currentUser
});

export const SET_IS_SIGN_IN = 'SET_IS_SIGN_IN';
export const setIsUserSignIn = (isUserSignIn) => ({
  type: SET_IS_SIGN_IN,
  isUserSignIn
});

export const changeLocale = (localeName) => (dispatch, getState) => {
  let state = getState();
  let { locale } = state;
  let newLocale = require('../../../common/locales/' + localeName);
  if (locale != newLocale){
    window.localeName = localeName;
    dispatch(setLocale(newLocale));
  }
}

export const login = (email, password) => (dispatch, getState) => {
  let state = getState();
  let locale = state.locale;
  loginApi(email, password, state.csrf).then((response) => {
    if (response.status == 0) {
      message.showMessage(locale.login.success, true, 2000);
      console.log(response);
      dispatch(setIsUserSignIn(true));
      dispatch(setCurrentUser(response.user));
      $('#login-modal').find('*[data-dismiss="modal"]').click();
    }
    else if (response.status == 1){
      message.showError(locale.login.emptyField);
      validator.creatMessageApi($('#login-email-field').parent(), locale.login.emptyField, 'error');
      validator.creatMessageApi($('#login-password-field').parent(), locale.login.emptyField, 'error');
    }
    else if (response.status == 2){
      // message.showError(locale.login.faild);
      validator.creatMessageApi($('#login-email-field').parent(), locale.login.faild, 'error');
      // validator.creatMessage($('#login-password-field').parent(), locale.login.faild, 'error');
    }
  }).catch(() => {
    message.showError(locale.network.error);
  });
}

export const SET_ARTICLE = 'SET_ARTICLE';
export const setArticle = (article) => ({
  type: SET_ARTICLE,
  article
});

export const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';
export const changeCurrentPage = (num) => ({
  type: CHANGE_CURRENT_PAGE,
  num
});

export const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';
export const changePerPage = (num) => ({
  type: CHANGE_PER_PAGE,
  num
});

export const CHANGE_TOTAL_PAGES = 'CHANGE_TOTAL_PAGES';
export const changeTotalPages = (num) => ({
  type: CHANGE_TOTAL_PAGES,
  num
});

export const fetchArticle = (id, page) => (dispatch, getState) => {
  let article;
  let state = getState();
  let { articleList } = state;
  if (articleList.length <= 0){
    fetchArticlesApi(page, state.perPage).then((response) => {
      if (response.code === 0){
        dispatch(setArticleList(response.items));
        dispatch(changeTotalPages(parseInt(response.pages)));
        dispatch(changeCurrentPage(parseInt(response.cur_page)));
        article = filterArticle(response.items, id);
        dispatch(setArticle(article));
      }
      else{
        if(response.message){
          message.showError(response.message);
        }
      }
    }).catch(() => {
      message.showError('网络出错');
    });
  }
  else{
    article = filterArticle(articleList, id);
    dispatch(setArticle(article));
  }
};

export const fetchArticles = (page) => (dispatch, getState) => {
  let state = getState();
  fetchArticlesApi(page, state.perPage).then((response) => {
    if (response.code === 0){
      dispatch(setArticleList(response.items));
      dispatch(changeTotalPages(parseInt(response.pages)));
      dispatch(changeCurrentPage(parseInt(response.cur_page)));
    }
    else{
      if(response.message){
        message.showError(response.message);
      }
    }
  }).catch(() => {
    message.showError('网络出错', false);
  });
}

function filterArticle(articleList, id) {
  let article;
  let result = articleList.filter((item) => parseInt(item.id) === parseInt(id));
  if (result.length) {
    article = result[0];
  }
  return article;
}

function loginApi(email, password, csrf) {
  return new Promise((resolve, reject) => {
    let tokenForm = new FormData();
    tokenForm.append('_csrf', csrf);
    // tokenForm.append('email', email);
    // tokenForm.append('password', password);
    $.ajax({
      url: PATH.url + 'users/sign_in_api?_csrf=' + csrf + '&email=' + email + '&password=' + password,
      // url: PATH.url + 'users/sign_in_api',
      // data: tokenForm,
      type: 'POST',
      processData : false,
      contentType : false,
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      }
    });
  })
}

function fetchArticlesApi(page, perPage) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: PATH.apiUrl + 'articles',
      data: {page: page, per_page: perPage},
      type: 'get',
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      }
    });
  })
}