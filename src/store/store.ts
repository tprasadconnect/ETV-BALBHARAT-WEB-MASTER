import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  StoreEnhancer,
} from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loginReducer } from './login';
import { registerReducer } from './register';
import { profileBuilderReducer } from './profileBuilder';
import { forgotPasswordReducer } from './forgotPassword';
import { verifyOtpReducer } from './verifyOtp';
import { changePasswordReducer } from './changePassword';
import { setResendOtpReducer } from './setResendOtp';
import { parentProfileReducer } from './parentProfile';
import { parentProfileUpdateReducer } from './parentProfileUpdate';
import { mobileUpdateReducer } from './mobileUpdate';
import { userStoreReducer } from './userStore';
import { languageReducer } from './languages';
import { sectionItemsReducer } from './sectionItems';
import { RESET_STORE_ACTION } from './resetStore/actionTypes';
import { categoryMasterReducer } from './categoryMaster';
import { subCategoryReducer } from './subCategory';
import { sectionCatItemsReducer } from './sectionCatItems';
import { mainCatReducer } from './mainCat';
import { catgMasterReducer } from './catgMaster';
import { searchReducer } from './search';
import { policyNotesReducer } from './policyNotes';
import { socialLinksReducer } from './socialLinks';
import { itemDetailsReducer } from './itemDetails';
import { sectionSimilarItemsReducer } from './sectionSimilarItems';
import { notificationsReducer } from './notifications';
import { notificationsCountReducer } from './notificationsCount';
import { continueWatchingReducer } from './continueWatching';
import { faqReducer } from './faq';
import { feedbackReducer } from './feedback';
import { settingFeedbackReducer } from './settingFeedback';
import { contactUsReducer } from './contactUs';
import { favouriteReducer } from './favourite';
import { sectionItemsShowsPopularReducer } from './sectionItemsShowsPopular';
import { sectionItemsMoviesPopularReducer } from './sectionItemsMoviesPopular';
import { setFavouriteReducer } from './setFavourite';
import { setWatchedListReducer } from './setWatchedList';
import { showItemDetailsReducer } from './showItemDetails';
import { showsSectionCatItemsReducer } from './showsSectionCatItems';
import { watchHistoryReducer } from './watchHistory';
import { setPinReducer } from './setPin';
import { changePinReducer } from './changePin';
import { preferencesReducer } from './preferences';
import { setPreferencesReducer } from './setPreferences';
import { videoPreferencesReducer } from './videoPreferences';
import { toonsReducer } from './toons';
import { selectLanguageReducer } from './selectLanguage';
import { ScheduledProgramsReducer } from './scheduledPrograms';
import { getPageReducer } from './getpage';

/* Create root reducer, containing all features of the application */
const appReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  profileBuilder: profileBuilderReducer,
  forgotPassword: forgotPasswordReducer,
  verifyOtp: verifyOtpReducer,
  changePassword: changePasswordReducer,
  setResendOtp: setResendOtpReducer,
  parentProfile: parentProfileReducer,
  parentProfileUpdate: parentProfileUpdateReducer,
  mobileUpdate: mobileUpdateReducer,
  userStore: userStoreReducer,
  language: languageReducer,
  sectionItems: sectionItemsReducer,
  sectionItemsShowsPopular: sectionItemsShowsPopularReducer,
  sectionItemsMoviesPopular: sectionItemsMoviesPopularReducer,
  sectionSimilarItems: sectionSimilarItemsReducer,
  categoryMaster: categoryMasterReducer,
  subCategory: subCategoryReducer,
  sectionCatItems: sectionCatItemsReducer,
  mainCat: mainCatReducer,
  catgMaster: catgMasterReducer,
  search: searchReducer,
  policyNotes: policyNotesReducer,
  socialLinks: socialLinksReducer,
  notifications: notificationsReducer,
  notificationsCount: notificationsCountReducer,
  continueWatching: continueWatchingReducer,
  faq: faqReducer,
  feedback: feedbackReducer,
  settingFeedback: settingFeedbackReducer,
  contactUs: contactUsReducer,
  favourite: favouriteReducer,
  itemDetails: itemDetailsReducer,
  setfavourite: setFavouriteReducer,
  setWatchedList: setWatchedListReducer,
  showItemDetails: showItemDetailsReducer,
  showsSectionCatItems: showsSectionCatItemsReducer,
  watchHistory: watchHistoryReducer,
  setPin: setPinReducer,
  changePin: changePinReducer,
  setpreference: setPreferencesReducer,
  preferences: preferencesReducer,
  videoPreferences: videoPreferencesReducer,
  toons: toonsReducer,
  selectLanguage: selectLanguageReducer,
  scheduledPrograms: ScheduledProgramsReducer,
  getPage: getPageReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  // eslint-disable-next-line no-param-reassign
  if (action.type === RESET_STORE_ACTION) state = undefined;

  return appReducer(state, action);
};

const storeEnhancers: StoreEnhancer = compose(
  applyMiddleware(thunk),
  devToolsEnhancer({})
);

const store = createStore(rootReducer, storeEnhancers);

export default store;
