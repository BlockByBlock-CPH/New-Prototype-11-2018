import { combineReducers } from 'redux';
import mapStore from './map_reducer';
import addressStore from './address_reducer';

const reducers = {
    map: mapStore,
    address: addressStore
}

const rootReducer = combineReducers(reducers);

export default rootReducer;