export default class Constants {
  static BASE_URL = "http://localhost:8085/";
  static END_POINTS = {
    REGISTER_DEALER: this.BASE_URL + 'registerdealer',
    REGISTER_TRADER: this.BASE_URL + 'registertrader',
    USER: this.BASE_URL + 'user',
    INSTRUMENT: this.BASE_URL + 'getMainPageData/',
    ORDER: this.BASE_URL + 'order',
    PAYMENT: this.BASE_URL + 'payment',
    LOGIN: this.BASE_URL + 'login',
    NOTIFICATION: this.BASE_URL + 'notification',
    NOTIFICATION_MARK_READ: 'marknotificationread',
    PLACE_LIMIT_ORDER: this.BASE_URL + 'addLimitOrder/',
    PLACE_MARKET_ORDER: this.BASE_URL + 'addMarketOrder/',
  }
  static SESSION_KEYS = {
    USER: 'user_key',
  }
}
