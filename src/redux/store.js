import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './features/stockSlice';

export default configureStore({
  reducer: {
    stock: stockReducer,
  },
});
