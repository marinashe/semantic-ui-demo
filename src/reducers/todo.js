import createReducer from 'config/createReducer';
import { Map, List } from 'immutable';

import Constants from '../actions/Constants';

const getDefaultState = () => (
  {
    data: List([])
  }
);

const lists = createReducer(getDefaultState(), {
  [Constants.ADD_LIST](state, action) {
    return { ...state, data: state.data.push(Map({ name: action.name, items: List([]) })) };
  },

  [Constants.REMOVE_LIST](state, action) {
    return { ...state, data: state.data.delete(action.index) };
  },

  [Constants.ADD_ITEM](state, action) {
    const list = state.data.get(action.index);
    const indexOfList = state.data.indexOf(list);
    const items = list.get('items').push(action.name);

    return { ...state, data: state.data.setIn([indexOfList, 'items'], items) };
  }
});


export default lists;

