export const stockHeaders = [
  'Symbol',
  'Price',
  'Volume',
  'Date/Time',
  'Day Change',
];
export const FILTERS = [
  {
    name: 'index',
    label: 'Index',
    type: 'SINGLE',
  },
  {
    name: 'stock',
    label: 'stock',
    type: 'SINGLE',
  },
  {
    name: 'highprice',
    label: 'High Price',
    type: 'SINGLE',
  },
  {
    name: 'lowprice',
    label: 'Low Price',
    type: 'SINGLE',
  },
  {
    name: 'type',
    label: 'Type',
    type: 'MULTI_CHOICE',
    options: ['index', 'NSE'],
  },
];
export const STOCK_LIST = ["AAPL", "MSFT", "TSLA", "BABA", "UBER", "DIS", "SBUX" ];