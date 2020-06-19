import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm, CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText, CLabel,
  CRow, CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {Link} from "react-router-dom";
import UserService from "../../../Services/UserService";
import User from "../../users/User";
import Redirect from "react-router-dom/es/Redirect";
import SessionService from "../../../Services/SessionService";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      userName: '',
      password: '',
      repeatPassword: '',
      email: '',
      dateOfBirth: '',
      companyName: '',
      type: '',
      errorMessage: '',
      redirect: '',
    }
  }

  registerUser = (e) => {
    e.preventDefault();

    let {fullName,
      userName,
      password,
      repeatPassword,
      email,
      dateOfBirth,
      companyName,
      type,
      errorMessage,} = this.state;

    if(password !== repeatPassword) {
      this.setState({errorMessage: "Passwords Don't Match"});
      return;
    } else {
      this.setState({errorMessage: ""});
    }
    if(type === '0') {
      this.setState({errorMessage: "Please Select User type"});
      return;
    } else {
      this.setState({errorMessage: ""});
    }

    if(type === 'trader') {
      UserService.registerTrader({
        fullName,
        userName,
        password,
        email,
        dateOfBirth,
      }).then((res) => {
        if(res) {
          SessionService.logout();
          this.setState({redirect: '/login'});
        } else {
          this.setState({errorMessage: "Something went wrong!"});
        }
      })
    } else if(type === 'dealer') {
      UserService.registerDealer({
        fullName,
        userName,
        password,
        email,
        dateOfBirth,
        companyName,
      }).then((res) => {
        if(res) {
          SessionService.logout();
          this.setState({redirect: '/login'})
        } else {
          this.setState({errorMessage: "Something went wrong!"});
        }
      })
    }
  }

  componentDidMount() {
    //TODO: Logout here
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
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={this.registerUser}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e) => {this.setState({fullName: e.target.value})}} type="text" placeholder="Full Name" autoComplete="full name" required/>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput minlength="4" onChange={(e) => {this.setState({email: e.target.value})}} type="text" placeholder="Username" autoComplete="username" required/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" placeholder="Email" autoComplete="email" required/>
                    </CInputGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="12">
                        <CLabel htmlFor="date-input">Date Of Birth</CLabel>
                        <CInput onChange={(e) => {this.setState({dateOfBirth: e.target.value})}} type="date" id="date-input" name="date-input" placeholder="date" required/>
                      </CCol>
                    </CFormGroup>


                    <CFormGroup row>
                      <CCol xs="12" md="12">
                        <CSelect onChange={(e) => {this.setState({type: e.target.value})}} custom name="select" id="select" required>
                          <option value="0">Please select user type</option>
                          <option value="trader">Trader</option>
                          <option value="dealer">Dealer</option>
                        </CSelect>
                      </CCol>
                    </CFormGroup>

                    {this.state.type === 'dealer' ?
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-tags"/>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput onChange={(e) => {this.setState({companyName: e.target.value})}} type="text" placeholder="Company Name" autoComplete="full name" required/>
                      </CInputGroup>: null}

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput minlength="8" onChange={(e) => {this.setState({password: e.target.value})}} type="password" placeholder="Password" autoComplete="new-password" required/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput minlength="8" onChange={(e) => {this.setState({repeatPassword: e.target.value})}} type="password" placeholder="Repeat password" autoComplete="new-password" required/>
                    </CInputGroup>
                    {this.state.errorMessage ? <div style={{color: 'red',}}>{this.state.errorMessage}</div> : null}
                    <CButton type={'submit'} color="success" block>Create Account</CButton>
                  </CForm>
                </CCardBody>
                <CCardFooter className="p-4">
                  <CRow>
                    <CCol xs="12" sm="12">
                      <Link style={{textDecoration: 'none'}} to={'/login'}>
                        <CButton className="btn-twitter mb-1" block><span>LOGIN</span></CButton>
                      </Link>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}
