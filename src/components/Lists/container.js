import { connect } from 'react-redux';

import { addList, removeList, addItem } from '../../actions/todo_actions';

import Lists from './main';

const mapStateToProps = ({ lists }) => ({
  lists: lists.data
});

const mapDispatchToProps = (dispatch) => ({
  addList: (name) => { dispatch(addList(name)); },
  addItem: (name, index) => { dispatch(addItem(name, index)); },
  removeList: (index) => { dispatch(removeList(index)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
