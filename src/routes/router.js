//  Vendor
import React, { Component, PropTypes as T }     from 'react';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router';

//  Views
import TodoList           from '../views/TodoList';
import TodoDetail         from '../views/TodoDetail';

//  Components
import MatchTypeRoute     from '../components/MatchTypeRoute';

import {
  SPLIT_VIEW,
  SINGLE_VIEW }           from './constants';
// Route Configuration
const routes = [
  {
    pattern: '/',
    exactly: true,
    component: (props) => (
      <Redirect to={{
        pathname: '/todos',
        state: { from: props.location }
      }}/>
    )
  },
  {
    pattern: '/todos',
    type: SPLIT_VIEW,
    exactly: true,
    panels: [
      {
        size: 1,
        component: TodoList
      },
      {
        size: 2,
        children: TodoDetail
      }
    ]

  },
  {
    pattern: '/todos/:id',
    type: SPLIT_VIEW,
    panels: [
      {
        size: 1,
        component: TodoList
      },
      {
        size: 2,
        component: TodoDetail
      }
    ]
  }
];

/**
 * App Router for setting up app routes
 * @returns {JSX}
 * @constructor
 */
export default class AppRouter extends Component {
  static propTypes = {
    history: T.object
  };

  render () {
    const { history } = this.props;
    return (
      <Router history={history}>
        <div className='app-body app-body--with-header'>
          { routes.map((route, i) => {
            return <MatchTypeRoute key={i} route={route} history={history} />;
          })}
        </div>
      </Router>
    );
  };
}


//TODO: Look into how to best handle sub routes
