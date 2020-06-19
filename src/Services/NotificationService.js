import axios from 'axios';
import Constants from './Constants';

let notifications = []

export default class NotificationService {

  static addNotification = async (message) => {
    notifications.push(message)
  }

  static getNotifications = async (userId) => {
    return notifications;
    //Todo
    return await axios.get(Constants.END_POINTS.NOTIFICATION, userId).then((res) => {
      return res.data;
    }).catch(err => {
      console.log(err);
      return null;
    })
  }

  static markAllNotificationsRead = async (userId) => {

    //Todo
    return await axios.put(Constants.END_POINTS.NOTIFICATION, userId).then((res) => {
      return res.data;
    }).catch(err => {
      console.log(err);
      return null;
    })
  }
}
