let { appState } = window.__PRELOADED_STATE__;
import locale from '../../../common/locales/zh-cn';
export const DEFAULT_STATE = {
	locale: locale,
	csrf: appState.csrf,
	currentUser: appState.currentUser,
	isUserSignIn: appState.isUserSignIn
};

