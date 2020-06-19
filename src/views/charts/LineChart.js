import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils/src'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.data = [];
  }

  random = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  defaultDatasets = (()=>{
    this.data = this.props.data || [];
    if(this.data.length === 0) {
      for (let i = 0; i <= 27; i++) {
        this.data.push(this.random(50, 200))
      }
    }
    return [
      {
        label: 'Dataset',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: this.data
      },
    ]
  })()

  labels = (() => {
    let labels = [];
    for(let i=0; i<this.data.length; ++i) labels.push('');
    return labels;
  })()

  defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {},
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    })()

  render() {
    return (
      <CChartLine
        {...this.props}
        datasets={this.defaultDatasets}
        options={this.defaultOptions}
        labels={this.labels}
      />
    )
  }
}
