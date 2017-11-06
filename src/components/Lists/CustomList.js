import T from 'prop-types';
import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import { Button, Input, List, Label } from 'semantic-ui-react';
import Classes from './styles';


class CustomList extends PureComponent {
  static propTypes = {
    item: T.instanceOf(Map).isRequired,
    add: T.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    const newValue = e.target.value;

    this.setState({ value: newValue });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleAdd();
    }
  }

  handleAdd() {
    if (this.state.value !== '') {
      this.props.add(this.state.value, this.props.item);
      this.setState({ value: '' });
      this.inputRef.focus();
    }
  }


  renderItem = (item, index) => (
    <List.Item as="li" key={ index }>{ item }</List.Item>
  );

  render() {
    const { item } = this.props;
    return (
      <div className={ Classes.list }>

        <Label as="a" color="olive" ribbon>{ item.get('name') }</Label>
        <div className={ Classes.input }>
          <Input
            ref={ (ref) => { this.inputRef = ref; } }
            placeholder="Name"
            onChange={ this.handleChange }
            value={ this.state.value }
            onKeyPress={ this.handleKeyPress }
          />
          <Button icon="add" color="teal" onClick={ this.handleAdd } />
        </div>
        <List as="ol">
          { item.get('items').map(this.renderItem) }
        </List>
      </div>
    );
  }
}

export default CustomList;
