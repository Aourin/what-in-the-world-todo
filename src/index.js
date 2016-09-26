import React, { Component } from 'react';
import AppRouter            from './router';
import './styles/styles.scss';

/**
 * Base AppWrapper Class for loading in app components
 * @class AppWrapper
 */
export default class AppWrapper extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        <header>
          <h4>What in the world TODO!?</h4>
        </header>
        <div>
          <AppRouter />
        </div>
      </div>
    );
  }
}
