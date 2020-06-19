import Constants from "./Constants";

const ls = require('local-storage');

export default class sessionService {
  constructor() {
    /*
    Empty Constructor
     */
  }

  static getUserDetails = () => {
    return ls.get(Constants.SESSION_KEYS.USER);
  }

  static isLogin = async () => {
    return ls.get(Constants.SESSION_KEYS.USER) !== null;
  }

  static login = (user) => {
    ls.set(Constants.SESSION_KEYS.USER, user);
  }

  static logout = async () => {
    ls.remove(Constants.SESSION_KEYS.USER);
    return true;
  }
}
