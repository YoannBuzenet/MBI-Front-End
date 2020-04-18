const URL_API = "http://mtgapi.local:8888";

const shopID = 1;

const avatarShopURL = "";

const shopName = "Fantasy Sphere - Nous rachetons toutes vos cartes";

const baseLang = 3;
const websiteDefaultLanguage = 3;

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

//EU or US
const gradingArea = "EU";

//30 minutes
const TIME_TO_LOG_OUT = 30 * 60 * 1000;

//55 minutes
const TIME_JWT_RENEW = 55 * 60 * 1000;

//4 minutes
//Throttling time between autologOut timer refresh
const TIME_THROTTLE = 240000;

//30 minutes
const TIME_TO_EXPIRE_LAST_MODIFICATION = 30 * 60 * 1000;

//2 days
const TIME_TO_EXPIRE_SET_LIST = 1000 * 60 * 60 * 24 * 2;

//flag size : 25*13px

// TRANSLATION AVAILABLE
const websiteDefaultLanguagearrayLangAvailables = [
  { locale: "fr-FR", translationsForUsersLocale: French, picture: "FR" },
  { locale: "en-US", translationsForUsersLocale: English, picture: "EN" },
];

export default {
  URL_API,
  shopID,
  shopName,
  baseLang,
  websiteDefaultLanguage,
  langDefinition,
  gradingArea,
  TIME_TO_LOG_OUT,
  TIME_JWT_RENEW,
  TIME_THROTTLE,
  TIME_TO_EXPIRE_LAST_MODIFICATION,
  TIME_TO_EXPIRE_SET_LIST,
  avatarShopURL,
  websiteDefaultLanguagearrayLangAvailables,
};
