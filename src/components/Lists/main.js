import T from 'prop-types';
import React, { PureComponent } from 'react';
import { List as ImmutableList } from 'immutable';
import { Button, Input } from 'semantic-ui-react';
import Classes from './styles';
import CustomList from './CustomList';

class Lists extends PureComponent {
  static propTypes = {
    lists: T.instanceOf(ImmutableList).isRequired,
    removeList: T.func.isRequired,
    addList: T.func.isRequired,
    addItem: T.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.renderList = this.renderList.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    const newValue = e.target.value;
    this.setState({ value: newValue });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }

  handleClick() {
    if (this.state.value !== '') {
      this.props.addList(this.state.value);
      this.setState({ value: '' });
      this.inputRef.focus();
    }
  }

  addNewItem(name, item) {
    this.props.addItem(name, this.props.lists.indexOf(item));
  }

  renderList(item, index) {
    return (
      <CustomList key={ index } item={ item } add={ this.addNewItem } />
    );
  }


  render() {
    return (
      <div className={ Classes.root }>
        <Input
          ref={ (ref) => { this.inputRef = ref; } }
          placeholder="Name"
          onChange={ this.handleChange }
          value={ this.state.value }
          onKeyPress={ this.handleKeyPress }
        />
        <Button primary onClick={ this.handleClick }>Add List</Button>
        <div className={ Classes.lists }>
          { this.props.lists.map(this.renderList) }
        </div>
      </div>
    );
  }
}

export default Lists;
