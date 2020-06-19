import React from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable, CForm, CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
  CRow, CSelect, CValidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import usersData from "../users/UsersData";
import {Link} from "react-router-dom";
import InstrumentService from "../../Services/InstrumentService";
import LineChart from "../charts/LineChart";
import OrderService from "../../Services/OrderService";
import SessionService from "../../Services/SessionService";

const getBadge = status => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}

export default class StockPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      graphData: [],
      showDialog: false,
      dialogCallback: ()=> {console.log("no function in callback")},
    }
  }

  componentDidMount() {
    let instrumentId = this.props.match.params.id;
    this.setState({instrumentId});
    InstrumentService.getTopBuySellOrders(instrumentId).then(orders => {
      this.setState({orders, });
    }).catch(err => console.log(err))
    InstrumentService.getStockDetails(instrumentId).then(data => {
      this.setState({
        graphData: data.points,
        high: data.high,
        low: data.low,
        name: data.name,
      });
    })
  }

  getLineChart = () => {
    let data = this.state.graphData;
    if(data.length > 0) {
      return <LineChart data={data} style={{height: '300px', marginTop: '40px'}}/>
    }
  }

  orderComponent = () => {
    let {showOrder} = this.state;
    if(showOrder === "" || showOrder == null) {
      return <div/>
    } else if(showOrder === "market") {
      return (
        <>
          <CCard>
            <CCardBody>
              <CForm className="was-validated">
                <CFormGroup row>
                  <CCol xs="12" md="12">
                    <CSelect onChange={(e) => {this.setState({type: e.target.value})}} custom name="select" id="select" required>
                      <option value="0">Please select user type</option>
                      <option value="buy">buy</option>
                      <option value="sell">sell</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="inputWarning2i">Please Enter Number of Stocks</CLabel>
                  <CInput onChange={(e) => this.setState({marketPrice: e.target.value})} className="form-control-warning" type={'number'} min={1} id="inputWarning2i" required />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid Number of stocks
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                  <CButton onClick={() => {
                    this.setState({
                      dialogCallback: this.placeMarketOrder,
                      showDialog: true,
                    })
                  }} block color="success">PLACE MARKET ORDER</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </>
      );
    } else if(showOrder === "limit") {
      return (
        <>
          <CCard>
            <CCardBody>
              <CForm className="was-validated">
                <CFormGroup row>
                  <CCol xs="12" md="12">
                    <CSelect onChange={(e) => {this.setState({type: e.target.value})}} custom name="select" id="select" required>
                      <option value="0">Please select user type</option>
                      <option value="buy">buy</option>
                      <option value="sell">sell</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="inputWarning2i">Please Enter Number of Stocks</CLabel>
                  <CInput onChange={(e) => this.setState({limitQuantity: e.target.value})} className="form-control-warning" type={'number'} min={1} id="inputWarning2i" required />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid Number of stocks
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                  {/**/}
                  </CFormGroup>
                  <CFormGroup>
                  <CLabel htmlFor="inputWarning2i">Please Enter Price</CLabel>
                  <CInput onChange={(e) => this.setState({limitPrice: e.target.value})} className="form-control-warning" type={'number'} min={1} id="inputWarning2i" required />
                  <CInvalidFeedback className="help-block">
                    Please provide a price
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                  <CButton onClick={() => {
                    this.setState({
                      dialogCallback: this.placeLimitOrder,
                      showDialog: true,
                    })
                  }} block color="success">PLACE MARKET ORDER</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </>
      );
    }
  }

  toggleOrder = (type) => {
    if(type === this.state.showOrder) {
      console.log("here111")
      this.setState({
        showOrder: "",
      })
    }
    this.setState({
      showOrder: type
    });
  }

  getModals = () => {
    return (
      <CModal
        show={this.state.showDialog}
        onClose={() => this.setState({showDialog: false})}
        size="sm"
      >
        <CModalHeader closeButton>
          <CModalTitle>WARNING</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Do you want to place an Order?
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={() => {this.state.dialogCallback();this.setState({showDialog: false, showOrder: "none",});}}>Place Order</CButton>{' '}
          <CButton color="secondary" onClick={() => this.setState({showDialog: false})}>Cancel</CButton>
        </CModalFooter>
      </CModal>
    );
  }

  render() {
    let {match} = this.props;
    const user = usersData.find(user => user.id.toString() === match.params.id)
    const userDetails = user ? Object.entries(user) :
      [['id', (<span><CIcon className="text-muted" name="cui-icon-ban"/> Not found</span>)]]

    return (
      <>
        <CRow>
          <CCol lg={10}>
            <CCard>
              <CCardHeader>
                <h4>Company:</h4> {this.state.name}
              </CCardHeader>
              <CCardHeader>
                <h4>Change: </h4> {this.state.high - this.state.low}
              </CCardHeader>
              <CCardHeader>
                <h4>% Change: </h4> {(this.state.high - this.state.low)/this.state.low}
              </CCardHeader>
              <CCardHeader>
                <h4>Instrument id: </h4> {match.params.id}
              </CCardHeader>
              <CCardHeader>
                <h4>High:</h4> {this.state.high}
              </CCardHeader>
              <CCardHeader>
                <h4>Low:</h4> {this.state.low}
              </CCardHeader>
              <CCardBody>
                {this.getLineChart()}
              </CCardBody>
            </CCard>
            <CCard>
              <CCardBody>
                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center">BUY ORDERS</th>
                    <th className="text-center">SELL ORDERS</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.orders.map((order, key) => {
                    return (
                      <tr key={key}>
                        <td className="text-center">
                          <div>{order.buy}</div>
                        </td>
                        <td className="text-center">
                          <div>{order.sell}</div>
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
            <CRow>
              <CCol xs="12" xl="4"/>
            <CCol xs="12" xl="4">
              <CButton onClick={() => {this.toggleOrder("limit")}} block color="warning">PLACE LIMIT ORDER</CButton>
            </CCol>
            <CCol xs="12" xl="4">
              <CButton onClick={() => {this.toggleOrder("market")}} block color="primary">PLACE MARKET ORDER</CButton>
            </CCol>
            </CRow>
            <br/>
            {this.orderComponent()}
          </CCol>
        </CRow>
        {this.getModals()}
      </>
    );
  }

  placeLimitOrder = () => {
    OrderService.palceLimitOrder({
      "price": parseInt(this.state.limitPrice.toString()),
      "side": this.state.type,
      "status": "pending",
      "instrumentName": this.state.instrumentId,
      "quantity": parseInt(this.state.limitQuantity.toString())
    });
  }

  placeMarketOrder = () => {
    OrderService.placeMarketOrder({
      "price": parseInt(this.state.marketPrice.toString()),
      "side": this.state.type,
      "status": "pending",
      "instrumentName": this.state.instrumentId
    });
  }
}
