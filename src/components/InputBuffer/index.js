import React, { Component, PropTypes as T } from 'react';

export default class InputBuffer extends Component {
  static propTypes = {
    onChange: T.func,
    onReset: T.func
  };
  state = {
    buffer: ''
  };

  constructor () {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onSetBuffer = this.onSetBuffer.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  /**
   * Handles hitting  and escape on the input
   * @param e
   * @param prop
   */
  handleKeyDown (e) {
    //  Handle Enter or Escape
    if (e.keyCode === 13) {
      this.onChange(e);
    } else if (e.keyCode === 27) {
      this.onResetBuffer();
    }
  }

  /**
   * Sets the initial buffer to the prop value
   */
  componentWillMount () {
    this.setState({
      buffer: this.props.value
    });
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      buffer: nextProps.value
    });
  }

  /**
   * Handle focusing the input on mount
   */
  componentDidMount () {
    this._input.focus();
  }
  /**
   * Handles buffer changes on the state buffer value
   * @param prop
   * @param value
   */
  onSetBuffer (e) {
    this.setState({
      buffer: e.target.value
    });
  }

  /**
   * Calls parent onChange and updates input state
   * @param prop
   * @param value
   */
  onChange (e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    this.setState({
      buffer: e.target.value
    });
  }

  /**
   * Passes up the blur call
   */
  onBlur () {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  /**
   * Resets the  buffer
   */
  onResetBuffer () {
    this.setState({
      buffer: {...this.props.value}
    });
    this.onBlur();
  }

  /**
   * Renders the title and input
   * @returns {JSX}
   */
  render () {
    const { buffer, edit } = this.state;
    const { value } = this.props;

    return (
      <input
        ref={(r) => this._input = r}
        {...this.props}
        value={buffer}
        onKeyDown={this.handleKeyDown}
        onChange={this.onSetBuffer}
        onBlur={this.onBlur} />
    );
  }
}

//TODO: Refactor Input to separate component for handling key bindings
