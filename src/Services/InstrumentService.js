import axios from 'axios';
import Constants from './Constants';

let insData = []

export default class InstrumentService {
  static getInstrumentsToDisplay = async () => {
    //Todo
    let timeNow = parseInt(new Date().toLocaleTimeString().split(':')[0]).toString() + parseInt(new Date().toLocaleTimeString().split(':')[1]).toString()
    return await axios.post(Constants.END_POINTS.INSTRUMENT).then((res) => {
      let dataPage = [];
      let obj = res.data.data.priceData;
      insData = obj;
      for (let symbol in obj) {
        console.log(obj[symbol].priceData['2358'] + "   " +   obj[symbol].priceData['1']);
        dataPage.push({name: obj[symbol].name, price: obj[symbol].priceData[timeNow], change: obj[symbol].priceData['2358'] - obj[symbol].priceData['1'], id: symbol});
      }
      console.log(dataPage)
      return dataPage;
    }).catch(err => {
      console.log(err);
      return null;
    })
  }

  static getStockPriceDataPoints = async (instrumentId) => {
    return [121, 100, 200, 212, 200, 400]
    //Todo
    return await axios.get(Constants.END_POINTS.INSTRUMENT + '/' + instrumentId).then((res) => {
      return res.data;
    }).catch(err => {
      console.log(err);
      return null;
    })
  }

  static getStockDetails = async (instrumentId) => {
    let pointsList = []
    let timeNow = parseInt(new Date().toLocaleTimeString().split(':')[0]).toString() + parseInt(new Date().toLocaleTimeString().split(':')[1]).toString()

    console.log(timeNow);
    for(let i=1; i< parseInt(timeNow); ++i) {
      pointsList.push(insData[instrumentId].priceData[i.toString()]);
    }
    return {
      name: insData[instrumentId].name,
      symbol: insData[instrumentId].symbol,
      points: pointsList,
      high: Math.max.apply(null, pointsList),
      low: Math.min.apply(null, pointsList),
    }
  }

  static getTopBuySellOrders = async (instrumentId) => {
    let lst = [];
    console.log(insData);
    let priceNow = insData[instrumentId].priceData['1500'];
    let buy = priceNow + Math.random() * 5;
    let sell = priceNow - Math.random() * 5;
    for(let i=0; i<5; ++i) {
      lst.push({buy: buy, sell: sell});
      buy += Math.random();
      sell -= Math.random();
    }
    return lst.reverse();
    //Todo
    return await axios.get(Constants.END_POINTS.INSTRUMENT + '/' + instrumentId).then((res) => {
      return res.data;
    }).catch(err => {
      console.log(err);
      return null;
    })
  }
}
