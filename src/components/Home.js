import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import stockData from '../data/stock.json';
import Search from '../components/Search';
import StockView from '../components/StockView';
import { useDispatch, useSelector } from 'react-redux';
import { setStocks, updateStockAction } from '../redux/features/stockSlice';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '@rneui/themed';
import PushNotification from 'react-native-push-notification';
import { STOCK_LIST } from '../constants/stockConstat';
//import finnhub from 'finnhub';

const TOKEN = 'cec7ta2ad3i77oivta20cec7ta2ad3i77oivta2g';
const socket = new WebSocket(`wss://ws.finnhub.io?token=${TOKEN}`);

const Home = () => {
  const dispatch = useDispatch();

  const searchData = (searchStr, stocks) => {
    if (!searchStr) {
      dispatch(setStocks(stockData.data));
    } else if (stocks.length) {
      const filteredStocks = [...stocks].filter(stock => {
        if (
          stock.sid &&
          stock.sid.toLowerCase().includes(searchStr.toLowerCase())
        ) {
          return stock;
        }
      });
      dispatch(setStocks(filteredStocks));
    }
  };

  const filterData = (filters, stocks) => {
    if (stocks.length && Object.keys(filters).length) {
      let filteredStocks = [...stocks];
      let finalList = [];
      if (filters.highprice) {
        const newStock = getNewStockByPrice(filteredStocks, filters.highprice);
        finalList.push(newStock);
      }
      if (filters.lowprice) {
        const newStock = getNewStockByPrice(filteredStocks, filters.lowprice);
        finalList.push(newStock);
      }
      if (filters.index) {
        finalList = filteredStocks.filter(stock => {
          if (stock.type === filters.index) {
            return stock;
          }
        });
      }
      if (filters.stock) {
        finalList = filteredStocks.filter(stock => {
          if (stock.type === filters.stock) {
            return stock;
          }
        });
      }
      dispatch(setStocks(finalList));
    }
  };

  const getNewStockByPrice = (stocks, price) => {
    let newPriceStock = { price: price === 'lowprice' ? Infinity : -Infinity };
    stocks.forEach(stock => {
      if (price === 'highprice' && stock.price > newPriceStock.price) {
        newPriceStock = stock;
      }
      if (price === 'lowprice' && stock.price < newPriceStock.price) {
        newPriceStock = stock;
      }
    });
    return newPriceStock;
  };

  const syncStockData = () => {
    // Connection opened -> Subscribe
    socket.addEventListener('open', function (event) {
      STOCK_LIST.forEach(st => {
        socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': st }));
      })
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      console.log('💻🖥 Message from server stock is ', event.data);
      const stockData = JSON.parse(event.data);
      if(stockData && stockData.data) {
        dispatch(updateStockAction(stockData.data[0]));
      }
    });
  }

  const unsubscribeSyncStocks = () => {
     // Unsubscribe
     STOCK_LIST.forEach(st => {
      socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': st }));
     });
  }

  const getStockData = () => {
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = TOKEN; // Replace this
    const finnhubClient = new finnhub.DefaultApi();

    //Company profile2
    finnhubClient.companyProfile2({ 'symbol': 'AAPL' }, (error, data, response) => {
      console.log("🚀 ~ file: Home.js:96 ~ finnhubClient.companyProfile2 ~ data", data)
    });

    //Quote
    const promiseList = []
    STOCK_LIST.forEach(st => {
      const promise = new Promise((resolve, reject) => {
        fetch(`https://finnhub.io/api/v1/quote?symbol=${st}&token=${TOKEN}`).then(async (data) => {
          const json = await data.json();
          console.log("🚀 ~ file: Home.js:116 ~ fetch ~ json", json)
          //if(data) {
            const newStock = {
              s: st,
              p: json?.c || '',
              t: json?.t || '',
              v: 1
            };
            resolve(newStock);
          //}
        });
      });
      promiseList.push(promise);
    });
    Promise.all(promiseList).then(data => {
      console.log("🚀🚗 ~ file: Home.js:122 ~ Promise.all ~ data", data);
      dispatch(setStocks(data));
      syncStockData();
    });
  }

  const handleNotification = (msg) => {
    PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Stock',
      message: msg + ' Stock has been updated check latest stocks',
      bigText: 'Stock changed',
      color: '#FAABAD'
    });

    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Price Changed',
      message: 'Stock value changed buy now',
      date: new Date(Date.now() + 2 * 1000),
      allowWhileIdle: true
    });
  }

  useEffect(() => {
    //dispatch(setStocks(stockData.data));
    getStockData();

    return () => {
      //unsubscribeSyncStocks();
    }
  }, [stockData]);
  return (
    <ScrollView>
      <View>
        <Search searchData={searchData} filterData={filterData} />
        <TouchableOpacity>
          <Button onPress={() => handleNotification('Message')} title={'Notify Me'}></Button>
        </TouchableOpacity>
        <StockView />
      </View>
    </ScrollView>
  );
};

export default Home;
