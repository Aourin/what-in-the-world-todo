import React, { Component, PropTypes as T } from 'react';

import './styles/styles.scss';
import AppRouter            from './routes/router';


/**
 * Base AppWrapper Class for loading in app components
 * @class AppWrapper
 */
export default class AppWrapper extends Component {
  static propTypes = {
    history: T.object
  };

  constructor () {
    super();
  }

  render () {
    const { history } = this.props;
    return (
      <div>
        <header>
          <h4>What in the world TODO!?</h4>
        </header>
        <div>
          <AppRouter history={history}/>
        </div>
      </div>
    );
  }
}
