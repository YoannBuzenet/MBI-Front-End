import English from "../translations/English.json";
import French from "../translations/French.json";

const URL_API = "http://mtgapi.local:8888";

const shopID = 1;

const avatarShopURL = "";

const shopName = "Fantasy Sphere - Nous rachetons toutes vos cartes";

//DEFINED LANGUAGE ID
const langDefinition = {
  1: "German",
  2: "Spanish",
  3: "French",
  4: "Italian",
  5: "Japanese",
  6: "Portuguese",
  7: "Russian",
  8: "Simplified Chinese",
  9: "English",
  10: "Korean",
  11: "Traditional Chinese",
};

//SHOP GRADING SYSTEM
//EU or US
const gradingArea = "EU";

//TIME TO AUTO LOG OUT
//30 minutes
const TIME_TO_LOG_OUT = 30 * 60 * 1000;

//JWT TOKEN AUTO RENEW
//55 minutes
const TIME_JWT_RENEW = 55 * 60 * 1000;

//Clear setTimeout - Throttling time between autologOut timer refresh
//4 minutes
const TIME_THROTTLE = 240000;

//COOKIE - LAST MODIFIED CARDS
//30 minutes
const TIME_TO_EXPIRE_LAST_MODIFICATION = 30 * 60 * 1000;

//COOKIE - SET LIST
//2 days
const TIME_TO_EXPIRE_SET_LIST = 1000 * 60 * 60 * 24 * 2;

//flag size : 25*13px

// TRANSLATION AVAILABLE
const websiteDefaultLanguageArrayLangAvailables = [
  { locale: "fr-FR", translationsForUsersLocale: French, picture: "FR" },
  { locale: "en-US", translationsForUsersLocale: English, picture: "EN" },
];

//Default website Language ID
const websiteDefaultLanguage = 3;

//Default Buying Language ID
const baseLang = 3;

//Default language on the website
const websiteDefaultLanguageContext = {
  locale: "en-US",
  translationsForUsersLocale: English,
  picture: "EN",
};

export default {
  URL_API,
  shopID,
  shopName,
  baseLang,
  websiteDefaultLanguage,
  websiteDefaultLanguageContext,
  langDefinition,
  gradingArea,
  TIME_TO_LOG_OUT,
  TIME_JWT_RENEW,
  TIME_THROTTLE,
  TIME_TO_EXPIRE_LAST_MODIFICATION,
  TIME_TO_EXPIRE_SET_LIST,
  avatarShopURL,
  websiteDefaultLanguageArrayLangAvailables,
};
