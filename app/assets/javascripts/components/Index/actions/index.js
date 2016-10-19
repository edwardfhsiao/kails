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

export const changeLocale = (localeName) => (dispatch, getState) => {
  let state = getState();
  let { locale } = state;
  let newLocale = require('../../../common/locales/' + localeName);
  if (locale != newLocale){
    dispatch(setLocale(newLocale));
  }
}

export const login = (email, password) => (dispatch, getState) => {
  let state = getState();
  loginApi(email, password, state.csrf).then((response) => {
    console.log(response);
  }).catch(() => {
    message.showError('网络出错');
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
    // tokenForm.append("utf8", "✓");
    tokenForm.append('_csrf', csrf);
    tokenForm.append('email', email);
    tokenForm.append('password', password);
    console.log(csrf);
    $.ajax({
      url: PATH.url + 'users/sign_in_api',
      data: tokenForm,
      type: 'POST',
      processData: false,
      contentType: false,
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