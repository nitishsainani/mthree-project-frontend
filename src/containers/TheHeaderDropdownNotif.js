import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import NotificationService from "../Services/NotificationService";
import SessionService from "../Services/SessionService";

export default class TheHeaderDropdownNotif extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    }
  }

  componentDidMount() {
    if(!SessionService.getUserDetails()) return;
    this.userId = SessionService.getUserDetails().userId;
    setInterval(() => {
      NotificationService.getNotifications(this.userId).then((notifications => this.setState({notifications})));
    }, 5000);
  }

  render() {
    const itemsCount = this.state.notifications.length;
    return (
      <CDropdown
        inNav
        className="c-header-nav-item mx-2"
      >
        <CDropdownToggle
          onClick={() => {NotificationService.markAllNotificationsRead(this.userId).then(r => {})}}
          className="c-header-nav-link"
          caret={false}
        >
          <CIcon name="cil-bell"/>
          <CBadge shape="pill" color="danger">{itemsCount}</CBadge>
        </CDropdownToggle>
        <CDropdownMenu placement="bottom-end" className="pt-0">
          <CDropdownItem
            header
            tag="div"
            className="text-center"
            color="light"
          >
            <strong>You have {itemsCount} new notifications</strong>
          </CDropdownItem>
          {this.state.notifications.map((notification, key) => {
            return (
              <CDropdownItem key={key}><CIcon name="cil-chart-pie" className="mr-2 text-info"/>{notification.message}</CDropdownItem>
            );
          })}
        </CDropdownMenu>
      </CDropdown>
    );
  }
}
