import React, { Component, PropTypes as T } from 'react';
import _                                    from 'lodash';

import InputBuffer from '../../components/InputBuffer';
import TodoItem    from './TodoItem'
import TodoService from '../../services/TodoService';

//  Filter Constants
const ALL = 'ALL';
const COMPLETE = 'COMPLETE';
const ACTIVE = 'ACTIVE';

export default class TodoDetail extends Component {
  static propTypes = {
    params: T.object
  };
  state = {
    todo: {},
    buffer: {},
    edit: {},
    filters: [ALL, ACTIVE, COMPLETE]
  };

  constructor () {
    super();
    this.setState = this.setState.bind(this);
    this.onResetBuffer = this.onResetBuffer.bind(this);
    this.onAddTodo = this.onAddTodo.bind(this);
    this.onSaveTodo = this.onSaveTodo.bind(this);
    this.onClearComplete = this.onClearComplete.bind(this);
    this.onToggleFilter = this.onToggleFilter.bind(this);
  }

  componentWillMount () {
    this.fetchTodo();
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.fetchTodo(nextProps.params.id);
    }
  }
  /**
   * Calls fetch on the service
   */
  fetchTodo (id) {
    TodoService.fetchOne(id || this.props.params.id)
      .then(() => {
        this.setState({
          todo: TodoService.getSelected()
        })
      });
    this.refreshState();
  }

  onSetTodoLabel (item, value) {
    const updated = {...this.state.todo.data};
    const idx = _.findIndex(updated.items, {_id: item._id});
    updated.items[idx].label = value;

    const todoState = {
      ...this.state.todo,
      data: updated
    };

    this.setState({
      todo: todoState,
      buffer: updated,
      edit: {}
    });
    this.onSaveTodo(updated);
  }
  /**
   * Sets a prop on the state model
   * @param prop
   * @param value
   */
  onSetProp (propPath, value) {
    const updated = {...this.state.todo.data};
    _.set(updated, propPath, value);

    this.onSaveTodo(updated);
  }

  /**
   * Resets the  buffer
   */
  onResetBuffer () {
    this.setState({
      buffer: {...this.state.todo.data},
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
   * Adds a todo item to the state
   */
  onAddTodo () {
    const todo = {...this.state.todo};
    todo.data.items.push({
      complete: false
    });

    this.setState({ todo });
    this.onSaveTodo();

  }

  /**
   * Toggle the todo item completion
   * @param idx
   */
  onToggleTodo (idx) {
    const todo = {...this.state.todo};
    const todoItem = todo.data.items[idx];

    todoItem.complete = !todoItem.complete;

    this.setState({
      todo: {...todo}
    });
    this.onSaveTodo(todo.data);
  }

  /**
   * Handle removing an item from the todo
   * @param idx
   */
  onRemoveTodo (idx) {
    const todo = this.state.todo.data;

    const newItems = todo.items.filter((item, index) => idx !== index);
    const newTodo = {
      ...todo,
      items: newItems
    };
    this.onSaveTodo(newTodo);
  }

  /**
   * Clears the completed todos
   */
  onClearComplete () {
    const updated = { ...this.state.todo.data };

    updated.items = updated.items.filter(item => !item.complete);
    this.setState({
      todo: {
        ...this.state.todo,
        data: updated
      }
    });
    this.onSaveTodo(updated);
  }

  /**
   * Save Todo by sending to service
   */
  onSaveTodo (todo) {

    TodoService.saveOne(todo || this.state.todo.data)
      .then(() => {
        this.refreshState()
      });

    this.refreshState();
  }

  /**
   * Toggles filters left or right by direction
   * @param type
   */
  onToggleFilter (direction) {
    const [first, second, third] = this.state.filters;
    let filters;
    if (direction === 'left') {
      filters = [second, third, first];
    } else if (direction === 'right') {
      filters = [third, first, second];
    }

    this.setState({
      filters: filters
    });

  }

  //TODO: Refactor filters to just iterate on an index ?
  /**
   * Checks the first state filter and
   * @param todos
   * @returns {*}
   */
  getFilteredTodos (todos) {
    const currentFilter = this.state.filters[0];
    let filtered;

    switch (currentFilter) {
      case ALL : filtered = [...todos];
        break;
      case COMPLETE: filtered = todos.filter(item => item.complete);
        break;
      case ACTIVE: filtered = todos.filter(item => !item.complete);
        break;
      default: [...todos];
    }

    return filtered;

  }
  /**
   * Refreshes the state
   * Uses between transitions and refetching the selected state
   */
  refreshState () {
    this.setState({
      todo: TodoService.getSelected(),
      edit: {},
      buffer: {...TodoService.getSelected().data}
    });
  }

  /**
   * Render todo item edit with InputBuffer
   * @param item
   * @param idx
   * @returns {XML}
   */
  renderTodoEdit (item, idx) {
    return (
      <InputBuffer
        name={`todo-item-${idx}`}
        placeholder='Enter the thing todo'
        className='form-control form-control input input--line-only'
        value={item.label || ''}
        onChange={(e) => {
          this.onSetTodoLabel(item, e.target.value);
        }}
        onBlur={this.onResetBuffer}
      />
    )
  }

  /**
   * Renders the title and input
   * @returns {JSX}
   */
  renderTitle () {
    const { todo, edit } = this.state;
    const { data } = todo;
    //  Checks if title is in the edit state
    if (edit.title) {
      return (
        <InputBuffer
          name='title'
          placeholder='Enter Title of Cool Todo List'
          className='form-control form-control-lg input input--line-only'
          value={data.title || ''}
          onChange={(e) => {
            this.onSetProp('title', e.target.value)
          }}
          onBlur={this.onResetBuffer}/>
      );
    } else {

      //  Creates the title and edit icon
      const title = data.title ? data.title : 'Please Add A Title';
      return (
        <span>
          <i className='fa fa-pencil-square-o' onClick={() => this.editBuffer('title')} /> {title}
        </span>
      );
    }
  }
  //TODO: Optimize by not requesting filtering twice
  //TODO: Refactor to make the current filter gettable
  /**
   * Renders an active counter if there are more than one todo item
   * @returns {XML}
   */
  renderCounter () {
    const todo = this.state.todo.data;
    const currentFilter = this.state.filters[0];
    const { items } = todo;

    //  Have this somewhere else, should figure out a way to reuse
    const counts = items.reduce((count, item) => {
      if (item.complete) {
        count.complete++;
      } else if (!item.complete) {
        count.active++;
      }
      return count;
    }, {
      complete: 0,
      active: 0
    });


    if (items.length) {

      let label;

      if (currentFilter === ALL) {
        label = `${counts.active} Active - ${counts.complete} Complete`
      } else {
        const filterLabel = currentFilter === ACTIVE ? 'Active' : 'Completed';
        label = `${counts[currentFilter.toLowerCase()]}/${items.length} Tasks ${filterLabel}`;
      }


      return (
        <span className='f-right'>
          <i onClick={() => this.onToggleFilter('left')}className='fa fa-caret-left cursor--pointer'/>
          &nbsp;{label}&nbsp;
          <i onClick={() => this.onToggleFilter('right')} className='fa fa-caret-right cursor--pointer'/>
        </span>
      );
    }

  }

  //TODO: This is getting big, should be refactored into smaller chunks
  /**
   * Render the Todos
   * @returns {JSX}
   */
  renderTodo () {
    const todo = this.state.todo.data;

    let listState;

    //  Checks todos and renders the state of the list
    if (Array.isArray(todo.items) && todo.items.length) {
      const filtered = this.getFilteredTodos(todo.items);
      if (filtered.length) {
        const items = filtered.map((item, idx) => {
          const parentIndex = _.findIndex(todo.items, item);
          let todoItem = (
            <TodoItem
              todo={item}
              onToggle={() => this.onToggleTodo(parentIndex)}
              onEdit={() => this.editBuffer(`Todo:${parentIndex}`) }
              onRemove={() => this.onRemoveTodo(parentIndex)}/>
          );

          //  Check if Todo is in edit state
          if (this.state.edit[`Todo:${parentIndex}`]) {
            todoItem = this.renderTodoEdit(item, parentIndex);
          }

          return (
            <li key={idx}>
              {todoItem}
            </li>
          );
        });

        listState =(
          <ul className='list'>
            {items}
          </ul>
        );
      } else {
        listState = (
          <div className='text-md-center m-y-1 text-muted'>
            <h1> <i className='fa fa-leaf fa-3 color-green' /></h1>
            <p className='p-x-4'>
              Hate to leaf you hanging, but this filter seems empty.
              Try messing with those <i className='fa fa-caret-left color-green' /> filter <i className='fa fa-caret-right color-green' /> thingies.
            </p>
          </div>
        )
      }

    } else {

      //  Sets empty state
      listState = (
        <div className='text-md-center m-y-1 text-muted'>
         <h1> <i className='fa fa-leaf fa-3 color-green' /></h1>
          <p className='p-x-4'>
            Hate to leaf you hanging, but it looks like you have nothing to do my friend.
            Try adding a new todo item or selecting another todo list to look at.
          </p>
        </div>
      );
    }

    return (
      <div className='list-wrapper'>
        {listState}
      </div>
    );
  }

  /**
   * Renders actions able to be taken
   * @returns {*[]}
   */
  renderActions () {
    const addItem = (
      <button
        key='add-item-btn'
        name='add-item'
        className='btn btn-main btn-block'
        onClick={this.onAddTodo}>
        <i className='fa fa-plus' /> Add Item
      </button>
    );
    const saveBtn = (
      <button
        key='save-btn'
        name='add-item'
        className='btn btn-green btn-block'
        onClick={this.onSaveTodo}>
        <i className='fa fa-save' /> Save Fancy List
      </button>
    );
    const clearBtn = (
      <button
        key='clear-btn'
        name='clear-item'
        className='btn btn-purple btn-block'
        onClick={this.onClearComplete}>
        <i className='fa fa-eraser' /> Clear Completed!
      </button>
    );

    //  Removing save btn until can work through state issues
    return [
      addItem,
      clearBtn
    ];
  }

  renderPane () {
    const selectedTodo = TodoService.getSelected();
    let saving;

    if (selectedTodo.updating) {
      saving = <span className='save-notification'><i className='fa fa-floppy-o' /></span>;
    }
    return (
      <div className='detail-pane'>
        {saving}
        <div className='row'>
          <div className='col-md'>
            <div className='panel panel--outline panel--outline-main'>
              <div className='panel-title bg-main color-white'>
                {this.renderTitle()}
                {this.renderCounter()}
              </div>
              <div className='panel-body'>
                {this.renderTodo()}
                {this.renderActions()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render () {
    const selectedTodo = TodoService.getSelected();

    if (selectedTodo.loading) {
      return <h3>Loading the Todo!</h3>;
    }  else if (selectedTodo.init && selectedTodo.data) {
      return this.renderPane();
    } else {
      return <h3>There was an issue loading the todo</h3>;
    }
  }
}

//TODO: Refactor todo items into separte comp
//TODO: Refactor empty state to generic empty state comp for reuse
//TODO: Experimenting with view only state handling pattern thingy
//TODO: Reorganize functions by group
//TODO: Data store needs some work, makes some wonky implementation in View

//  Potential state issue with how it is tracked by array index
