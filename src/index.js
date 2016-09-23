import React, { Component } from 'react';
import AppRouter            from './router';

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
        <h1>Super Cool Fish! - Top Level </h1>
        <AppRouter />
      </div>
    );
  }
}
