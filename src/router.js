//  Vendor
import React              from 'react';
import {
  BrowserRouter as Router,
  Match,
  Redirect
} from 'react-router';

//  Views
import Home               from './views/Home';
import TodoList           from './views/TodoList';

//  Components
import FlexRouteContainer from './components/FlexRouteContainer';



const SPLIT_VIEW  = 'SPLIT_VIEW';
const SINGLE_VIEW = 'SINGLE_VIEW';

//  Match with subroutes
const MatchWithSubRoutes = (route) => (
  <Match {...route} render={(props) => {
    let renderItem;
    switch (route.type) {
      case SPLIT_VIEW:

        //  Sends props down to component panels
        const panels = route.panels.map((panel) => {

          //  Checks for component and returns a copy of the panel with props added
          if (panel.component) {
            return {
              ...panel,
              props: { ... props }
            };
          } else {
            return panel;
          }
        });

        renderItem = <FlexRouteContainer panels={panels}/>;
        break;
      case SINGLE_VIEW:
        renderItem = <route.component {...props} routes={route.routes}/>;
        break;
      default:
        renderItem = <route.component {...props} routes={route.routes}/>;
    }

    return renderItem;
  }}/>
);

// Route Configuration
const routes = [
  {
    pattern: '/',
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
    panels: [
      {
        size: 1,
        component: TodoList
      },
      {
        size: 2,
        children: <h3>Empty Detail View</h3>
      }
    ]
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
      <div className='app-body app-body--with-header'>
        { routes.map((route, i) => <MatchWithSubRoutes key={i} {...route}/>) }
      </div>
    </Router>
  );
};

export default AppRouter;


//TODO: Add Subroutes
