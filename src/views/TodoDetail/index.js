import React, { Component, PropTypes as T } from 'react';

export default class TodoDetail extends Component {
  static propTypes = {
    params: T.object
  };
  state = {
    todo: {}
  };
  constructor () {
    super();
  }
  componentWillReceiveProps () {
    console.log('should rec');
  }
  render () {
    const { params } = this.props;
    return (
      <div>
        <div className='row'>
          <div className='col-md'>
            <h3>Fancy Detail</h3>
            <p>Details for {params.id}</p>
          </div>
        </div>
      </div>
    );
  }
}
