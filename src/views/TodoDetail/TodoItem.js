import React from 'react';
import './todo-item-styles.scss';

const TodoItem = ({todo}) => {
  const { label, complete } = todo;
  const completeClass = complete ? 'fa-check-circle-o' : 'fa-genderless';
  const className = complete ? 'todo-item--complete' : 'cursor--pointer';
  return (
    <div className={`todo-item ${className}`}>
      <i className={`fa ${completeClass} todo-icon cursor--pointer`} />&nbsp;
      <span className='label'>{label || 'Please enter a todo item!'}</span>
    </div>
  )
};

export default TodoItem;
