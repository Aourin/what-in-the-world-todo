import React from 'react';
import './todo-item-styles.scss';

const TodoItem = ({todo, onToggle, onEdit}) => {
  const { label, complete } = todo;
  const completeClass = complete ? 'fa-check-circle-o' : 'fa-genderless';
  const className = complete ? 'todo-item--complete' : 'cursor--pointer';
  let editProp = {};

  //  Only allow editing on non complete items
  if (!complete) {
    editProp.onClick = onEdit;
  }

  return (
    <div className={`todo-item ${className}`}>
      <i className='fa fa-times todo-icon cursor--pointer todo-close pull-right' />
      <i
        className={`fa ${completeClass} todo-icon cursor--pointer`}
        onClick={onToggle}
      />&nbsp;
      <span className='label' {...editProp}>{label || 'Please enter a todo item!'}</span>
    </div>
  )
};

export default TodoItem;
