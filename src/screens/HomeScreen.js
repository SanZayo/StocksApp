import { View, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import stockData from '../data/stock.json';
import Search from '../components/Search';
import StockView from '../components/StockView';
import { useDispatch } from 'react-redux';
import { setStocks } from '../redux/features/stockSlice';

const HomeScreen = ({ navigation }) => {
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

  console.log(stockData);
  useEffect(() => {
    dispatch(setStocks(stockData.data));
  }, [stockData]);
  return (
    <SafeAreaView>
      <View>
        <Search searchData={searchData} filterData={filterData} />
        <StockView navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
