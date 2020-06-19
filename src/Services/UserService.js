import axios from 'axios';
import Constants from './Constants'
import SessionService from "./SessionService";



export default class UserService {
  static registerTrader = async (user) => {
    return await axios.post(Constants.END_POINTS.REGISTER_TRADER, user).then((res) => {
      return res.data.statusCode === 200;
    }).catch(err => {
      console.log(err);
      return false;
    })
  }

  static registerDealer = async (user) => {
    return await axios.post(Constants.END_POINTS.REGISTER_DEALER, user).then((res) => {
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
