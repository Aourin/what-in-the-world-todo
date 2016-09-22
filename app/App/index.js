import React, { Component } from 'react';
import BaseView             from '../../src';
/**
 * Base App Class for loading in app components
 * @class App
 */
export default class App extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        <h1>Super Cool Fish! - Top Level </h1>
        <BaseView />
      </div>
    );
  }
}
