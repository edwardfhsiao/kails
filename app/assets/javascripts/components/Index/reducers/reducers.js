import * as ACTION from '../actions';
import { DEFAULT_STATE } from './ConstValue';


export function articleList(articleList = DEFAULT_STATE.articleList, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE_LIST:
      return action.articleList
    default:
      return articleList;
  }
}

export function article(article = DEFAULT_STATE.article, action) {
  switch (action.type) {
    case ACTION.SET_ARTICLE:
      return action.article;
    default:
      return article;
  }
}

export function currentPage(currentPage = DEFAULT_STATE.currentPage, action) {
  switch (action.type) {
    case ACTION.CHANGE_CURRENT_PAGE:
      return parseInt(action.num);
    default:
      return currentPage;
  }
}

export function perPage(perPage = DEFAULT_STATE.perPage, action) {
  switch (action.type) {
    case ACTION.CHANGE_PER_PAGE:
      return parseInt(action.num);
    default:
      return perPage;
  }
}

export function totalPages(totalPages = DEFAULT_STATE.totalPages, action) {
  switch (action.type) {
    case ACTION.CHANGE_TOTAL_PAGES:
      return parseInt(action.num);
    default:
      return totalPages;
  }
}
