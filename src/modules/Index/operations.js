// @flow
import {put, takeLatest, call} from 'redux-saga/effects';

import Actions from './actions';
import {ChargeApi, HotpepperApi} from '../../helpers/api';
import ShopListPage from '../../components/ShopListPage';

export default function* (): Generator<*, *, *> {
  yield takeLatest(Actions.getSearchResult, getSearchResult);
  yield takeLatest(Actions.sendStripeToken, sendStripeToken);
}

function* getSearchResult(action) : Generator<*, *, *> {
  const {params, navigator} = action.payload;

  if (navigator) {
    yield put(Actions.changeValueForKey({key: 'message', value: 'お店を検索中...'}));
  } else {
    yield put(Actions.changeValueForKey({key: 'isProgress', value: true}));
  }

  const response = yield call(HotpepperApi.get, params);

  if (response.status === 200) {
    yield put(Actions.changeValueForKey({key: 'shopList', value: response.data.shop_list}));

    if (!params.food) {
      yield put(Actions.changeValueForKey({key: 'foodList', value: response.data.food_list}));
    }

    if (navigator) {
      navigator.pushPage({component: ShopListPage, key: 'ShopListPage'});
    } else {
      yield put(Actions.changeValueForKey({key: 'isProgress', value: false}));
    }

  }
  yield put(Actions.changeValueForKey({key: 'isLoading', value: false}));
}

function* getFoodCategory(action) {
  const response = yield call(HotpepperApi.getFoodCategory);
  if (response.status === 200) {
    yield put(Actions.changeValueForKey({key: 'foodCategory', value: response.data.results.food_category}));
  }
}

function* getFood(action) : Generator<*, *, *> {
  const {
    food_category,
    loading,
  } = action.payload;

  if (loading) {
    yield put(Actions.changeValueForKey({key: 'message', value: '料理名を更新中...'}));
    yield put(Actions.changeValueForKey({key: 'isFoodLoading', value: true}));
  }

  const response = yield call(HotpepperApi.getFood, {food_category});
  if (response.status === 200) {
    yield put(Actions.changeValueForKey({key: 'foodList', value: response.data.food_list}));
  }

  yield put(Actions.changeValueForKey({key: 'isFoodLoading', value: false}));

}


function* sendStripeToken(action) : Generator<*, *, *> {
  yield put(Actions.changeValueForKey({key: 'isLoading', value: true}));
  const token = action.payload;
  yield call(ChargeApi.post, token);
  yield put(Actions.changeValueForKey({key: 'isLoading', value: false}));
}
