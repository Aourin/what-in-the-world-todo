import React    from 'react';
import Home     from './Home';
import TodoList from './TodoList';

import {
  BrowserRouter as Router,
  Match
} from 'react-router';

//  Match with subroutes
const MatchWithSubRoutes = (route) => (
  <Match {...route} render={(props) => (
    <route.component {...props} routes={route.routes}/>
  )}/>
);

// Route Configuration
const routes = [
  {
    pattern: '/',
    component: Home
  },
  {
    pattern: '/todos',
    component: TodoList
  }
];

/**
 * App Router for setting up app routes
 * @returns {JSX}
 * @constructor
 */
const AppRouter = () => {
  return (
    <Router>
      <div>
        { routes.map((route, i) => <MatchWithSubRoutes key={i} {...route}/>) }
      </div>
    </Router>
  );
};

export default AppRouter;


//TODO: Add Subroutes
