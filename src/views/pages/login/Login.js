import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import UserService from "../../../Services/UserService";
import Redirect from "react-router-dom/es/Redirect";
import SessionService from "../../../Services/SessionService";

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: null,
    }
  }

  loginUser = () => {
    let username = this.state.username;
    let password = this.state.password;

    UserService.login({
      username,password,
    }).then((res) => {
      console.log(res);
      this.setState({redirect: '/'})
    })
  }

  componentDidMount() {
    SessionService.isLogin().then(login => {
      if(login) {
        this.setState({redirect: '/'});
      }
    })
  }

  render() {
    let {redirect} = this.state;
    if(redirect) {
      return <Redirect to={redirect} />
    }
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user"/>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput onChange={(e) => {
                          this.setState({username: e.target.value})
                        }} type="text" placeholder="Username" autoComplete="username" required/>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked"/>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput onChange={(e) => {
                          this.setState({password: e.target.value})
                        }} type="password" placeholder="Password" autoComplete="current-password"/>
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton onClick={this.loginUser} color="primary" className="px-4">Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Get the latest stock market, stock information & quotes, data analysis reports, as well as a
                        general overview of the market landscape from Mthree Stocks.</p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}
