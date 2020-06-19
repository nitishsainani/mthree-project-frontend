import React, {Component, lazy} from 'react';
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCallout,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader, CCarousel, CCarouselCaption, CCarouselControl, CCarouselIndicators, CCarouselInner, CCarouselItem,
  CCol,
  CProgress,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import LineChart from '../charts/LineChart.js'
import InstrumentService from "../../Services/InstrumentService";
import {Link} from "react-router-dom";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const slides = [
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
]

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    }
  }

  componentDidMount() {
    InstrumentService.getInstrumentsToDisplay().then((stocks) => {
      this.setState({stocks,});
    })
  }

  render() {
    if(!this.state.stocks) return <div/>
    console.log(this.state.stocks);
    return (
      <>
        <CCard>
          <CCardBody>
            <CRow>
              {/*<CCol xs="12" xl="6">*/}
              {/*  <CCard>*/}
              {/*    <CCardHeader>*/}
              {/*      Carousel animation with autoSlide*/}
              {/*    </CCardHeader>*/}
              {/*    <CCardBody>*/}
              {/*      <CCarousel animate autoSlide={3000}>*/}
              {/*        <CCarouselIndicators/>*/}
              {/*        <CCarouselInner>*/}
              {/*          <CCarouselItem>*/}
              {/*            <LineChart data={[100, 200, 100, 400]} style={{height: '300px', marginTop: '40px', backgroundColor: 'black', color: 'white'}}/>*/}
              {/*          </CCarouselItem>*/}
              {/*          <CCarouselItem>*/}
              {/*            <LineChart data={[200, 200, 100, 400, 100]} style={{height: '300px', marginTop: '40px'}}/>*/}
              {/*          </CCarouselItem>*/}
              {/*          <CCarouselItem>*/}
              {/*            <LineChart data={[300, 200, 100, 400, 200, 300]} style={{height: '300px', marginTop: '40px'}}/>*/}
              {/*            <CCarouselCaption><h3>Slide 3</h3><p>Slide 3</p></CCarouselCaption>*/}
              {/*          </CCarouselItem>*/}
              {/*        </CCarouselInner>*/}
              {/*        <CCarouselControl direction="prev"/>*/}
              {/*        <CCarouselControl direction="next"/>*/}
              {/*      </CCarousel>*/}
              {/*    </CCardBody>*/}
              {/*  </CCard>*/}
              {/*</CCol>*/}
              <br/>
              {/* Content Start from here*/}
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center">Stock Id</th>
                    <th className="text-center">Stock Name</th>
                    <th className="text-center">Stock Price</th>
                    <th className="text-center">% Change</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.stocks.map((stock, key) => {
                    return (
                      <tr key={key} onClick={() => console.log(stock.id)}>
                        <td className="text-center">
                          <Link style={{ textDecoration: 'none', color: 'gray' }} to={'/instrument/' + stock.id}>
                              <div>{stock.id}</div>
                          </Link>
                        </td>
                        <td className="text-center">
                          <Link style={{ textDecoration: 'none' }} to={'/instrument/' + stock.id}>
                            <div>{stock.name}</div>
                          </Link>
                        </td>
                        <td className="text-center" style={{}}>
                          <Link style={{ textDecoration: 'none', color: stock.change >= 0 ? 'green' : 'red', }} to={'/instrument/' + stock.id}>
                            <div>{stock.price}</div>
                          </Link>
                        </td>
                        <td className="text-center" style={{color: stock.change >= 0 ? 'green' : 'red'}}>
                          <Link style={{ textDecoration: 'none', color: stock.change >= 0 ? 'green' : 'red', }} to={'/instrument/' + stock.id}>
                            <div>{stock.change + '%'}</div>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
            </CRow>
          </CCardBody>
        </CCard>
      </>
    );
  }
}
