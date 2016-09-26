import React, { Component, PropTypes as T } from 'react';

export default class TodoDetail extends Component {
  static propTypes = {
    params: T.object
  };
  state = {
    todo: {},
    buffer: {},
    editTitle: false
  };
  constructor () {
    super();
  }

  /**
   * Handles hitting enter on the input
   * @param e
   * @param prop
   */
  handleKeyDown (e, prop) {
    if (e.keyCode === 13) {
      this.onSetProp(prop, e.target.value);
    } else if (e.keyCode === 27) {
      this.onResetBuffer();
    }
  }

  /**
   * Handles buffer changes on the state model
   * @param prop
   * @param value
   */
  onChangeProp (prop, value) {
    const updatedBuffer = {...this.state.todo, [prop]: value};
    this.setState({
      buffer: updatedBuffer
    });
  }

  /**
   * Sets a prop on the state model
   * @param prop
   * @param value
   */
  onSetProp (prop, value) {
    const updated = {...this.state.todo, [prop]: value};

    this.setState({
      todo: updated,
      buffer: updated,
      editTitle: false
    });
  }

  /**
   * Resets the  buffer
   */
  onResetBuffer () {
    this.setState({
      buffer: {...this.state.todo},
      editTitle: false
    });
  }

  /**
   * Renders the title and input
   * @returns {JSX}
   */
  renderTitle () {
    console.log('title', this.state.todo);
    const { editTitle, todo, buffer } = this.state;
    if (editTitle) {
      return (
        <input
          name='title'
          placeholder='Enter Title of Cool Todo List'
          className='form-control form-control-lg input input--line-only'
          value={buffer.title || ''}
          onKeyDown={(e) => {this.handleKeyDown(e, 'title');}}
          onChange={(e) => {this.onChangeProp('title', e.target.value)}}
          onBlur={(e) => {this.onSetProp('title', e.target.value);}} />
      );
    } else {
      const title = todo.title ? todo.title : 'Please Add A Title';
      return (
        <div className='panel-title'>
          <i className='fa fa-pencil-square-o' onClick={() => {this.setState({editTitle: true})}}></i> {title}
        </div>
      );
    }

  }

  render () {
    const { params } = this.props;

    return (
      <div className='detail-pane'>
        <div className='row'>
          <div className='col-md'>
            {this.renderTitle()}
            <p>Details for {params.id}</p>
          </div>
        </div>
      </div>
    );
  }
}

//TODO: Refactor Input to separate component for handling key bindings
