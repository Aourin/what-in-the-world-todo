import React from 'react';
import './todo-item-styles.scss';

const TodoItem = ({todo, onToggle, onEdit, onRemove}) => {
  const { label, complete } = todo;
  const completeClass = complete ? 'fa-check-circle-o todo-check--complete' : 'fa-genderless todo-check';
  const className = complete ? 'todo-item--complete' : 'cursor--pointer';
  let editProp = {};

  //  Only allow editing on non complete items
  if (!complete) {
    editProp.onClick = onEdit;
  }

  return (
    <div className={`todo-item ${className}`}>
      <i
        className={`fa ${completeClass} todo-icon`}
        onClick={onToggle}
      />&nbsp;
      <span className='label' {...editProp}>{label || 'Please enter a todo item!'}</span>
      <i className='fa fa-times todo-icon todo-close' onClick={onRemove} />
    </div>
  )
};

export default TodoItem;
