import { createSlice } from '@reduxjs/toolkit';

export const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    stocks: [],
  },
  reducers: {
    setStocks: (state, data) => {
      state.stocks = data.payload;
    },
    filterStocks: (state, data) => {
      const { payload } = data;
      if (!payload) {
        state.stocks = state.stocks;
      } else {
        state.stocks = [...state.stocks].filter(stock => {
          if (stock.sid.includes(payload)) {
            return stock;
          }
        });
      }
    },
    updateStockAction: (state, action) => {
      console.log("🚀 ~ file: stockSlice.js:25 ~ action", action)
      const { payload } = action;
      console.log("🚀🏴‍☠️ ~ file: stockSlice.js:27 ~ payload", payload)
      if (payload) {
        const stock = state.stocks.find(st => st.s === payload.s);
        Object.keys(payload).forEach(key => {
          if (stock.hasOwnProperty(key)) {
            stock[key] = payload[key];
          }
        });
      }
    },
    addNewStock: (state, action) => {
      //console.log("actions is addNewStock", action);
      const { payload } = action;
      if (payload) {
        state.stocks.push(payload);
      }
    },
  },
});

export const { setStocks, filterStocks, updateStockAction, addNewStock } =
  stockSlice.actions;

export default stockSlice.reducer;
