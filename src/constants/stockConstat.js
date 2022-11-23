export const stockHeaders = [
  'Name',
  'Type',
  'Exchange',
  'Price',
  'Change',
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
