import helpers from '../helpers';
import models from '../models';
import config from '../../config/config';
import _ from 'lodash';

async function catchError(ctx, next) {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch(err) {
    let status = err.status || 500;
    // let message = e.message || 'Server Error!'
    ctx.status = status;
    ctx.state = {
      status: status,
      helpers: helpers,
      currentUser: null
    };
    await ctx.render('error/error', {});
    if (status == 500) {
      console.log('server error', err, ctx);
    }
  }
}

async function addHelper(ctx, next) {
  let currentUser = null;
  if(ctx.session.userId){
    currentUser = await models.User.findById(ctx.session.userId);
  }
  ctx.state = {
    csrf: ctx.csrf,
    helpers: helpers,
    currentUser: currentUser,
    isUserSignIn: (currentUser != null)
  };
  await next();
}

let locale;
async function getLocale(ctx, next) {
  let rq = ctx.request.query;
  let localeFile = rq.locale || config.local;
  ctx.session.locale = localeFile;
  try {
    locale = require('../../config/locales/' + localeFile);
  } catch (ex) {
    locale = require('../../config/locales/' + config.locale);
  }
  ctx.state = _.merge(ctx.state, {
    locale: locale,
    selectedLocale: localeFile
  })
  console.log(ctx.state);
  await next();
}

export default {
  catchError,
  addHelper,
  getLocale
};