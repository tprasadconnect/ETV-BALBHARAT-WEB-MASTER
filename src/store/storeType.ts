export interface SystemState {
  register: {
    loader: boolean;
    error: any;
    data: any;
  };
  login: {
    loader: boolean;
    error: any;
    data: any;
  };
  forgotPassword: {
    loader: boolean;
    error: any;
    data: any;
  };
  changePassword: {
    loader: boolean;
    error: any;
    data: any;
  };
  verifyOtp: {
    loader: boolean;
    error: any;
    data: any;
  };
  setResendOtp: {
    loader: boolean;
    error: any;
    data: any;
  };
  parentProfile: {
    loader: boolean;
    error: any;
    data: any;
  };
  parentProfileUpdate: {
    loader: boolean;
    error: any;
    data: any;
  };
  mobileUpdate: {
    loader: boolean;
    error: any;
    data: any;
  };
  userStore: {
    loader: boolean;
    error: any;
    data: any;
  };
  profileBuilder: {
    activeTab: number;
    profileBuilderData: any;
    avatarList: any;
    preferencesList: any;
    setKidRegistration: {
      loader: boolean;
      error: any;
      data: any;
    };
    updateKidRegistration: {
      loader: false;
      error: null;
      data: null;
    };
    getKidProfile: {
      loader: boolean;
      error: any;
      data: any;
    };
  };
  language: {
    loader: boolean;
    error: any;
    data: any;
  };
  mainCat: {
    loader: boolean;
    error: any;
    data: any;
  };
  sectionItems: {
    loader: boolean;
    error: any;
    data: any;
  };
  sectionItemsShowsPopular: {
    loader: boolean;
    error: any;
    data: any;
  };
  sectionItemsMoviesPopular: {
    loader: boolean;
    error: any;
    data: any;
  };
  itemDetails: {
    loader: boolean;
    error: any;
    data: any;
  };
  showItemDetails: {
    loader: boolean;
    error: any;
    data: any;
  };
  sectionSimilarItems: {
    loader: boolean;
    error: any;
    data: any;
  };
  sectionCatItems: {
    loader: boolean;
    error: any;
    data: any;
  };
  showsSectionCatItems: {
    loader: boolean;
    error: any;
    data: any;
  };
  categoryMaster: {
    loader: boolean;
    error: any;
    data: any;
  };
  subCategory: {
    loader: boolean;
    error: any;
    data: any;
  };
  catgMaster: {
    loader: boolean;
    error: any;
    data: any;
  };
  search: {
    loader: boolean;
    error: any;
    data: any;
  };
  policyNotes: {
    loader: boolean;
    error: any;
    data: any;
  };
  socialLinks: {
    loader: boolean;
    error: any;
    data: any;
  };
  notifications: {
    loader: boolean;
    error: any;
    data: any;
  };
  continueWatching: {
    loader: boolean;
    error: any;
    data: any;
  };
  notificationsCount: {
    loader: boolean;
    error: any;
    data: any;
  };
  faq: {
    loader: boolean;
    error: any;
    data: any;
  };
  favourite: {
    loader: boolean;
    error: any;
    data: any;
  };
  feedback: {
    loader: boolean;
    error: any;
    data: any;
  };
  setFavorite: {
    loader: boolean;
    error: any;
    data: any;
  };
  settingFeedback: {
    loader: boolean;
    error: any;
    data: any;
  };
  contactUs: {
    loader: boolean;
    error: any;
    data: any;
  };
  setWatchedList: {
    loader: boolean;
    error: any;
    data: any;
  };
  watchHistory: {
    loader: boolean;
    error: any;
    data: any;
  };
  setPin: {
    loader: boolean;
    error: any;
    data: any;
  };
  changePin: {
    loader: boolean;
    error: any;
    data: any;
  };
  preferences: {
    loader: boolean;
    error: any;
    data: any;
  };
  videoPreferences: {
    loader: boolean;
    error: any;
    data: any;
  };
  setPreferences: {
    loader: boolean;
    error: any;
    data: any;
  };
  toons: {
    loader: boolean;
    error: any;
    data: any;
  };
  selectLanguage: {
    loader: boolean;
    error: any;
    data: {
      lang_id: string;
      lang_name: string;
      lang_name_en: string;
      lang_image: string;
    };
  };
  scheduledPrograms: {
    loader: boolean;
    error: any;
    data: any;
  };
  getPage: {
    loader: boolean;
    error: any;
    data: any;
  };
}
