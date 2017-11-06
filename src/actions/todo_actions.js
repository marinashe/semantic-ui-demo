import Constants from './Constants';

export const addList = (name) => (
  {
    type: Constants.ADD_LIST,
    name
  }
);

export const removeList = (index) => (
  {
    type: Constants.REMOVE_LIST,
    index
  }
);

export const addItem = (name, index) => (
  {
    type: Constants.ADD_ITEM,
    name,
    index
  }
);
