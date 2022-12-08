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
      //console.log("actions is updateStock", action);
      const { payload } = action;
      console.log('actions is updateStock', payload);
      if (payload) {
        const stock = state.stocks.find(st => st.sid === payload.sid);
        Object.keys(payload).forEach(key => {
          if (stock.hasOwnProperty(key)) {
            stock[key] = payload[key];
          }
        });
        //console.log("*************** ", state.stocks);
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
