const URL_API = "http://mtgapi.local:8888";

const shopID = 1;

const baseLang = 3;

const gradingArea = "isEU";

//30 minutes
const TIME_TO_LOG_OUT = 30 * 60 * 1000;

//55 minutes
const TIME_JWT_RENEW = 55 * 60 * 1000;

//4 minutes
const TIME_THROTTLE = 240000;

//30 minutes
const TIME_TO_EXPIRE_LAST_MODIFICATION = 30 * 60 * 1000;

//2 days
const TIME_TO_EXPIRE_SET_LIST = 1000 * 60 * 60 * 24 * 2;

//flag size : 25*13px

export default {
  URL_API,
  shopID,
  baseLang,
  gradingArea,
  TIME_TO_LOG_OUT,
  TIME_JWT_RENEW,
  TIME_THROTTLE,
  TIME_TO_EXPIRE_LAST_MODIFICATION,
  TIME_TO_EXPIRE_SET_LIST,
};
