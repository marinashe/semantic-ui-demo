import React from 'react';
import { render } from 'react-dom';

import store from 'config/createStore';
import Application from 'components/Application';
import 'semantic-ui-css/semantic.min.css';

const hotRender = () => {
  render(
    <Application store={ store } />,
    document.getElementById('root')
  );
};

hotRender();

module.hot.accept('components/Application', hotRender);
