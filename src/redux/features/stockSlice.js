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
  },
});

export const { setStocks, filterStocks } = stockSlice.actions;

export default stockSlice.reducer;
