import React, { Component, PropTypes as T } from 'react';
import InputBuffer from '../../components/InputBuffer';

export default class TodoDetail extends Component {
  static propTypes = {
    params: T.object
  };
  state = {
    todo: {},
    buffer: {},
    edit: {}
  };
  constructor () {
    super();
    this.onResetBuffer = this.onResetBuffer.bind(this);
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
      edit: {}
    });
  }

  /**
   * Resets the  buffer
   */
  onResetBuffer () {
    this.setState({
      buffer: {...this.state.todo},
      edit: {}
    });
  }

  /**
   * Sets the buffer state active
   * @param prop
   */
  editBuffer (prop) {
    const newState = {...this.state};
    newState.edit[prop] = true;
    this.setState(newState);
  }

  /**
   * Renders the title and input
   * @returns {JSX}
   */
  renderTitle () {
    const { todo, buffer, edit } = this.state;

    //  Checks if title is in the edit state
    if (edit.title) {
      return (
        <InputBuffer
          name='title'
          placeholder='Enter Title of Cool Todo List'
          className='form-control form-control-lg input input--line-only'
          value={todo.title || ''}
          onChange={(e) => {
            this.onSetProp('title', e.target.value)
          }}
          onBlur={this.onResetBuffer}/>
      );
    } else {

      //  Creates the title and edit icon
      const title = todo.title ? todo.title : 'Please Add A Title';
      return (
        <div className='panel-title'>
          <i className='fa fa-pencil-square-o' onClick={() => this.editBuffer('title')} /> {title}
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
          </div>
        </div>
      </div>
    );
  }
}

//TODO: Refactor Input to separate component for handling key bindings
