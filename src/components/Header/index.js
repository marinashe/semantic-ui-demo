import React from 'react';
import { NavLink } from 'react-router-dom';
import { Header, Icon, Button } from 'semantic-ui-react';
import Classes from './styles';

const links = [
  { to: '/', children: 'Home' },
  { to: '/dashboard', children: 'Dashboard' }
];

const HeaderApp = () => (
  <Header className={ Classes.header } as="h2">
    <Icon name="fighter jet" color="red" size="big" />
    <Header.Content>
      Semantic UI React
    </Header.Content>
    <div className={ Classes.root }>
      <Header.Subheader>
        { links.map((props, i) => (
          <NavLink
            key={ i }
            activeClassName={ Classes.active }
            exact
            { ...props }
          />
        ))}
      </Header.Subheader>
    </div>
    <div>
      <Button
        color='red'
        content='Like'
        icon='heart'
        label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
      />

      <Button
        basic
        color='blue'
        content='Fork'
        icon='fork'
        label={{ as: 'a', basic: true, color: 'blue', pointing: 'left', content: '1,048' }}
      />
    </div>
  </Header>
);

export default HeaderApp;
