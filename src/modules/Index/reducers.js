import {handleActions} from 'redux-actions';
import {Record, Map} from 'immutable';

import Actions from './actions';


let params = Map({
  latitude: null,
  longitude: null,
  lunch: 1,
  range: "3",
  wifi: 0,
});
// const searchParamsJson = localStorage.getItem('searchParams');
// if (searchParamsJson) {
//   params = Map(JSON.parse(searchParamsJson));
// }


const IndexRecord = Record({
  params,
  shopList: [],
  foodList: [],
  isLoading: false,
  isProgress: false,
  message: '',
  isSideOpen: false,
  naviShop: null,
  foodCategory: [],
  selectedCategory: "",
  isOpenModal: false,
  isToast: false,
  isFoodLoading: false,
});

class Index extends IndexRecord {
}


export default handleActions({
  [Actions.changeValueForKey]: (state, action) => {
    const {key, value} = action.payload;
    return state.set(key, value);
  },
  [Actions.changeValueOfParams]: (state, action) => {
    const {key, value} = action.payload;
    return state.setIn(['params', key], value);
  },
}, new Index());
