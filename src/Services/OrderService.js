import axios from 'axios';
import Constants from './Constants'
import SessionService from "./SessionService";
import NotificationService from "./NotificationService";



export default class OrderService {
  static palceLimitOrder = async (order) => {
    let userId = SessionService.getUserDetails().userId;
    NotificationService.addNotification({message: 'Your Order with price ' + order.price + " and quantity " + order.quantity + " is Created"})
    return await axios.post(Constants.END_POINTS.PLACE_LIMIT_ORDER + userId + "/" + userId, order).then((res) => {
      return res.data.statusCode === 200;
    }).catch(err => {
      console.log(err);
      return false;
    })
  }

  static placeMarketOrder = async (order) => {
    console.log(order);
    let userId = SessionService.getUserDetails().userId;
    NotificationService.addNotification({message: 'Your Order with price ' + order.price + " is Created"})
    return await axios.post(Constants.END_POINTS.PLACE_MARKET_ORDER + userId + "/" + userId, order).then((res) => {
      return res.data.statusCode === 200;
    }).catch(err => {
      console.log(err);
      return false;
    })
  }

  static login = async (user) => {
    return await axios({
      method: 'post',
      url: Constants.END_POINTS.LOGIN,
      params: user
    }).then((res) => {
      SessionService.login(res.data.data);
      return true;
    }).catch(err => {
      console.log(err);
      return null;
    })
  }
}
