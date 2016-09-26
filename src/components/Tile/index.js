import React, { PropTypes as T } from 'react';
import './tile-style.scss';
/**
 * Simple Tile Stateless Component
 */
const Tile = ({title, content, onClick}) => {
  const classNames = typeof onClick === 'function' ? 'tile cursor--pointer' : 'tile';
  return (
    <div className={classNames} onClick={onClick}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

Tile.propTypes =  {
  title: T.string,
  content: T.string,
  onClick: T.func
};

export default Tile;
