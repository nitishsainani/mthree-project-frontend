import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import SessionService from "../Services/SessionService";
import Redirect from "react-router-dom/es/Redirect";

export default class TheHeaderDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: '',
    }
  }

  componentDidMount() {
    SessionService.isLogin().then(res => {
      if(!res) {
        this.setState({redirect: '/login'});
      }
    })
  }

  render() {
    let {redirect} = this.state;
    if (redirect) {
      return <Redirect to={redirect}/>
    }
    return (
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            {SessionService.getUserDetails() && SessionService.getUserDetails().fullName.split(" ")[0]}
          </div>
          <div className="c-avatar">
            <CIcon name="cil-chevron-bottom" className="mfe-2"/>
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Account</strong>
          </CDropdownItem>
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-bell" className="mfe-2"/>*/}
          {/*  Updates*/}
          {/*  <CBadge color="info" className="mfs-auto">42</CBadge>*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-envelope-open" className="mfe-2"/>*/}
          {/*  Messages*/}
          {/*  <CBadge color="success" className="mfs-auto">42</CBadge>*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-task" className="mfe-2"/>*/}
          {/*  Tasks*/}
          {/*  <CBadge color="danger" className="mfs-auto">42</CBadge>*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-comment-square" className="mfe-2"/>*/}
          {/*  Comments*/}
          {/*  <CBadge color="warning" className="mfs-auto">42</CBadge>*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem*/}
          {/*  header*/}
          {/*  tag="div"*/}
          {/*  color="light"*/}
          {/*  className="text-center"*/}
          {/*>*/}
          {/*  <strong>Settings</strong>*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-user" className="mfe-2"/>Profile*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-settings" className="mfe-2"/>*/}
          {/*  Settings*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-credit-card" className="mfe-2"/>*/}
          {/*  Payments*/}
          {/*  <CBadge color="secondary" className="mfs-auto">42</CBadge>*/}
          {/*</CDropdownItem>*/}
          {/*<CDropdownItem>*/}
          {/*  <CIcon name="cil-file" className="mfe-2"/>*/}
          {/*  Projects*/}
          {/*  <CBadge color="primary" className="mfs-auto">42</CBadge>*/}
          {/*</CDropdownItem>*/}
          <CDropdownItem divider/>
          <CDropdownItem onClick={() => {
            SessionService.logout().then(() => {
              this.setState({redirect: '/login'})
            })
          }}>
            <CIcon name="cil-lock-locked" className="mfe-2"/>
            LOGOUT
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    );
  }
}
