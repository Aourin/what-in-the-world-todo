import React, { Component, PropTypes as T } from 'react';
import { Match }                            from 'react-router';

import FlexRouteContainer                   from '../FlexRouteContainer';
import { SPLIT_VIEW, SINGLE_VIEW }          from '../../routes/constants';

//  Match with subroutes
export default class MatchTypeRoute extends Component {
  static propTypes = {
    route: T.object
  };
  componentWillReceiveProps () {
    console.log("YES");
  }
  render () {
    const { route, history } = this.props;
    //  Returns a Route Match
    return (
      <Match {...route} history={history} render={(props) => {
        console.log('match props', props);
        console.log('context', this.context);
        const { type, panels } = route;
        const routeProps = {
          history,
          params: props.params
        };

        let renderItem;

        //Checks on type for future route types
        switch (type) {
          case SPLIT_VIEW:

            //  Sends props down to component panels
            const flexPanels = panels.map((panel) => {

              //  Checks for component and returns a copy of the panel with props added
              if (panel.component) {
                return {
                  ...panel,
                  props
                };
              } else {
                return panel;
              }
            });

            //  Render a flex route container with history
            renderItem = <FlexRouteContainer {...props} panels={flexPanels} {...routeProps}/>;
            break;
          case SINGLE_VIEW:
            renderItem = <route.component {...props} routes={route.routes} {...routeProps}/>;
            break;
          default:
            renderItem = <route.component {...props} routes={route.routes} {...routeProps}/>;
        }

        return renderItem;
      }}/>
    );
  }

};
