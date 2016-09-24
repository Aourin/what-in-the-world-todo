import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  constructor () {
    super();
  }

  render () {
    const { children } = this.props;
    return (
      <div>
        <h1>Home Route</h1>
      </div>
    );
  }
}


//TODO: Add Basic App Layout
//TODO: Add Header
//TODO: Add Footer
