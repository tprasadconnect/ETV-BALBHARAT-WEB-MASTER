import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import './App.scss';
import { useDispatch } from 'react-redux';
import { ROUTER_URL_CONSTANT } from './constants/routerUrlConstant';
import { Login } from './pages/login/Login';
import { ForgotPassword } from './pages/forgotPassword/ForgotPassword';
import { NewPassword } from './pages/newPassword/NewPassword';
import { Registration } from './pages/registration/Registration';
import { ProfileDetails } from './pages/profileBuilder/ProfileDetails';
import { Menu } from './pages/menu/Menu';
import { Account } from './pages/menu/account/Account';
import { EditAccount } from './pages/menu/account/EditAccount';
import Interceptor from './interceptor';
import { UpdateMobile } from './pages/menu/account/UpdateMobile';
import { AccountChangePassword } from './pages/menu/accountChangePassword/AccountChangePassword';
import { AccountForgotPassword } from './pages/menu/accountForgotPassword/AccountForgotPassword';
import { VerifyMobile } from './pages/registration/VerifyMobile';
import { actionTypes } from './store/userStore';
import { selectLanguageActionTypes as selectLanguage } from './store/selectLanguage';
import { Languages } from './pages/home/banner/Languages';
import { Notifications } from './pages/menu/notifications/Notifications';
import { Search } from './pages/search/Search';
import { MyBB } from './pages/myBB/MyBB';
import { MyBBAllEvents } from './pages/myBB/MyBBAllEvents';
import { MyBBEventDetails } from './pages/myBB/MyBBEventDetails';
import { MyBBEventClosed } from './pages/myBB/MyBBEventClosed';
import { ProfileBuilder } from './pages/profileBuilder/ProfileBuilder';
import { SubCategories } from './pages/tvShows/subCategories/SubCategories';
import ScrollToTop from './components/ScrollToTop';
import { TvShowsDetails } from './pages/tvShows/TvShowsDetails';
import { MoviesDetails } from './pages/movies/MoviesDetails';
import { PrivacyPolicy } from './pages/privacyPolicy/PrivacyPolicy';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';
import { CookiePolicy } from './pages/cookiesPolicy/CookiePolicy';
import { TermsOfUse } from './pages/termsOfUse/TermsOfUse';
import { TermsAndIps } from './pages/termsAndIps/TermsAndIps';
import { MenuLanguages } from './pages/menu/menuLanguages/MenuLanguages';
import { Feedback } from './pages/menu/feedback/Feedback';
import { HelpAndSupport } from './pages/menu/helpAndSupport/HelpAndSupport';
import { SubSettings } from './pages/menu/subSettings/SubSettings';
import { NotificationSettings } from './pages/menu/subSettings/notificationSettings/NotificationSettings';
import { VideoSettings } from './pages/menu/subSettings/videoSettings/VideoSettings';
import { TimerSettings } from './pages/menu/subSettings/timerSettings/TimerSettings';
import { MyFavourites } from './pages/menu/myFavourites/MyFavourites';
import { SwitchProfile } from './pages/menu/switchProfile/SwitchProfile';
import { ChangePin } from './pages/menu/changePin/ChangePin';
import { SetTimer } from './pages/menu/subSettings/setTimer/SetTimer';
import { WatchHistory } from './pages/menu/watchHistory/WatchHistory';
import { CreatePin } from './pages/menu/createPin/CreatePin';
import { EnterPin } from './pages/menu/enterPin/EnterPin';
import { ForgotSettingsPin } from './pages/menu/forgotSettingsPin/ForgotSettingsPin';
import { ResetSettingsPin } from './pages/menu/resetSettingsPin/ResetSettingsPin';
import { LandingPage } from './pages/landingPage/LandingPage';
import { NewTVShows } from './pages/newTvShows/NewTvShows';
import { NewMovies } from './components/NewMovies';
import { ToonsDetail } from './pages/toons/ToonsDetail';
import { BBSubscription } from './pages/Subscription/BBSubscription';
import { NewListItems } from './pages/newListItems/NewListItems';
import { LanguageSelect } from './pages/languagePage/languageSelect';
import { AboutUs } from './pages/aboutUs/aboutUs';
import { getItem } from './utils/storage';
import { TestPage } from './pages/testPage/testPage';
import { ChannelSchedule } from './pages/channelSchedule/channelSchedule';
import { ContactPage } from './pages/contactUs/contactUs';

Interceptor.interceptor();

const checkAuth = () => {
  const user = localStorage.getItem('userData');
  if (user && user !== undefined && user !== 'undefined') {
    return true;
  }
  return false;
};
const AdminGuardedRoute = () => {
  return ({ component: Component, ...rest }: any) => {
    return (
      /* eslint-disable react/jsx-props-no-spreading */
      <div>
        <Route
          /* eslint-disable react/jsx-props-no-spreading */
          {...rest}
          render={(props) =>
            checkAuth() ? <Component {...props} /> : <Redirect to="/login" />
          }
        />
      </div>
    );
  };
};

ReactGA.initialize('UA-46221236-34');
ReactGA.pageview(window.location.pathname + window.location.search);
const App: React.FC = () => {
  const AdminRoute = AdminGuardedRoute();
  const dispatch = useDispatch();
  const history = useHistory();
  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch({
      type: actionTypes.USER_STORE_SUCCESS_ACTION,
      payload: { data: JSON.parse(localStorage.getItem('userData') || 'null') },
    });
    // set language to store
    const langId = getItem('bbUserLanguageId');
    if (langId) {
      dispatch({
        type: selectLanguage.SELECT_LANGUAGE_SUCCESS_ACTION,
        payload: { data: langId },
      });
    } else {
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.LANGUAGE_SELECTION}`,
      });
    }
  });

  return (
    <>
      <ScrollToTop>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={ROUTER_URL_CONSTANT.HOME} />}
          />
          <Route path={ROUTER_URL_CONSTANT.LOGIN} component={Login} />
          <Route
            path={ROUTER_URL_CONSTANT.FORGOT_PASSWORD}
            component={ForgotPassword}
          />
          <Route
            path={ROUTER_URL_CONSTANT.NEW_PASSWORD}
            component={NewPassword}
          />
          <Route path={ROUTER_URL_CONSTANT.REGISTER} component={Registration} />
          <Route
            path={ROUTER_URL_CONSTANT.VERIFY_MOBILE}
            component={VerifyMobile}
          />
          <Route path={ROUTER_URL_CONSTANT.HOME} component={LandingPage} />

          <AdminRoute
            path={ROUTER_URL_CONSTANT.PROFILE_DETAILS}
            component={ProfileDetails}
          />
          <AdminRoute
            path={`${ROUTER_URL_CONSTANT.PROFILE_BUILDER}/:id?`}
            component={ProfileBuilder}
          />

          <AdminRoute path={ROUTER_URL_CONSTANT.MENU} exact component={Menu} />
          <AdminRoute
            path={ROUTER_URL_CONSTANT.ACCOUNT}
            exact
            component={Account}
          />
          <AdminRoute
            path={ROUTER_URL_CONSTANT.EDIT_ACCOUNT}
            exact
            component={EditAccount}
          />
          <Route
            path={ROUTER_URL_CONSTANT.UPDATE_MOBILE}
            component={UpdateMobile}
          />
          <AdminRoute
            path={ROUTER_URL_CONSTANT.ACCOUNT_CHANGE_PASSWORD}
            exact
            component={AccountChangePassword}
          />
          <Route
            path={ROUTER_URL_CONSTANT.ACCOUNT_FORGOT_PASSWORD}
            component={AccountForgotPassword}
          />

          <Route
            path={ROUTER_URL_CONSTANT.MOVIES}
            component={NewMovies}
            exact
          />
          <Route
            path={ROUTER_URL_CONSTANT.TV_SHOWS}
            component={NewTVShows}
            exact
          />
          <Route
            exact
            path={ROUTER_URL_CONSTANT.ORIGINALS}
            component={SubCategories}
          />
          <Route
            exact
            path={ROUTER_URL_CONSTANT.GLOBAL}
            component={SubCategories}
          />
          <Route
            exact
            path={ROUTER_URL_CONSTANT.TODDLERS}
            component={SubCategories}
          />
          <Route
            exact
            path={ROUTER_URL_CONSTANT.EDUTAINMENT}
            component={SubCategories}
          />
          <Route path={ROUTER_URL_CONSTANT.MY_BB} component={MyBB} />
          <Route
            path={ROUTER_URL_CONSTANT.MY_BB_ALLEVENT}
            component={MyBBAllEvents}
          />
          <Route
            path={ROUTER_URL_CONSTANT.MY_BB_EVENT_DETAIL}
            component={MyBBEventDetails}
          />
          <Route
            path={ROUTER_URL_CONSTANT.MY_BB_EVENT_CLOSED}
            component={MyBBEventClosed}
          />

          <Route
            path={ROUTER_URL_CONSTANT.HOME_LANGUAGES}
            component={Languages}
          />
          <Route
            path={ROUTER_URL_CONSTANT.HOME_NOTIFICATIONS}
            component={Notifications}
          />
          <Route path={ROUTER_URL_CONSTANT.HOME_SEARCH} component={Search} />

          <AdminRoute path={ROUTER_URL_CONSTANT.MENU} exact component={Menu} />
          <Route
            path={`${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/:seasonId/:seasonsLength/:showId/:itemId?`}
            component={TvShowsDetails}
          />
          <Route
            path={`${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/:seasonId/:seasonsLength/:showId/:itemId?`}
            component={TvShowsDetails}
          />
          <Route
            path={ROUTER_URL_CONSTANT.TODDLERS_DETAILS}
            component={TvShowsDetails}
          />
          <Route
            path={ROUTER_URL_CONSTANT.EDUTAINMENT_DETAILS}
            component={TvShowsDetails}
          />
          <Route
            path={ROUTER_URL_CONSTANT.MOVIES_DETAILS}
            component={MoviesDetails}
          />
          <Route
            path={ROUTER_URL_CONSTANT.PRIVACY_POLICY}
            component={PrivacyPolicy}
          />
          <Route
            path={ROUTER_URL_CONSTANT.TERMS_AND_CONDITIONS}
            component={TermsOfUse}
          />
          <Route
            path={ROUTER_URL_CONSTANT.TRADEMARKS_AND_IPS}
            component={TermsAndIps}
          />
          <Route
            path={ROUTER_URL_CONSTANT.COOKIE_POLICY}
            component={CookiePolicy}
          />
          <Route
            path={ROUTER_URL_CONSTANT.MENU_LANGUAGES}
            component={MenuLanguages}
          />
          <Route path={ROUTER_URL_CONSTANT.FEEDBACK} component={Feedback} />
          <Route
            path={ROUTER_URL_CONSTANT.HELP_AND_SUPPORT}
            component={HelpAndSupport}
          />
          <Route
            path={ROUTER_URL_CONSTANT.SUB_SETTINGS}
            component={SubSettings}
          />
          <Route
            path={ROUTER_URL_CONSTANT.SUB_SETTINGS_NOTIFICATION}
            component={NotificationSettings}
          />
          <Route
            path={ROUTER_URL_CONSTANT.SUB_SETTINGS_TIMER}
            component={TimerSettings}
          />
          <Route
            path={ROUTER_URL_CONSTANT.SUB_SETTINGS_VIDEO}
            component={VideoSettings}
          />
          <Route
            path={ROUTER_URL_CONSTANT.NOTIFICATIONS}
            component={Notifications}
          />
          <Route
            path={ROUTER_URL_CONSTANT.My_FAVOURITES}
            component={MyFavourites}
          />
          <Route
            path={ROUTER_URL_CONSTANT.SWITCH_PROFIEL}
            component={SwitchProfile}
          />
          <Route path={ROUTER_URL_CONSTANT.CHANGE_PIN} component={ChangePin} />
          <Route
            path={ROUTER_URL_CONSTANT.TIMER_SETTINGS}
            component={SetTimer}
          />
          <Route
            path={ROUTER_URL_CONSTANT.WATCH_HISTORY}
            component={WatchHistory}
          />
          <Route path={ROUTER_URL_CONSTANT.CREATE_PIN} component={CreatePin} />

          <Route path={ROUTER_URL_CONSTANT.ENTER_PIN} component={EnterPin} />

          <Route
            path={ROUTER_URL_CONSTANT.FORGOT_PIN}
            component={ForgotSettingsPin}
          />
          <Route
            path={ROUTER_URL_CONSTANT.RESET_PIN}
            component={ResetSettingsPin}
          />

          <Route
            path={ROUTER_URL_CONSTANT.TOONS_DETAIL}
            component={ToonsDetail}
          />

          <Route
            path={ROUTER_URL_CONSTANT.LANDING_PAGE}
            component={LandingPage}
          />
          <Route
            path={ROUTER_URL_CONSTANT.SUBSCRIPTION}
            component={BBSubscription}
          />
          <Route
            path={ROUTER_URL_CONSTANT.LIST_OF_ITEMS}
            component={NewListItems}
          />
          <Route
            path={ROUTER_URL_CONSTANT.LANGUAGE_SELECTION}
            component={LanguageSelect}
          />
          <Route path={ROUTER_URL_CONSTANT.ABOUT_US} component={AboutUs} />

          <Route path="/testPage" component={TestPage} />

          <Route
            path={ROUTER_URL_CONSTANT.CHANNEL_SCHEDULE}
            component={ChannelSchedule}
          />

          <Route path={ROUTER_URL_CONSTANT.CONTACTUS} component={ContactPage} />

          <Route component={PageNotFound} />
        </Switch>
      </ScrollToTop>
    </>
  );
};

export default App;
