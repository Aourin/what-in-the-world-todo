import React        from 'react';
import ReactDOM     from 'react-dom';
import AppWrapper   from '../src';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

ReactDOM.render(
  <AppWrapper history={history} />,
  document.getElementById('react-app')
);
