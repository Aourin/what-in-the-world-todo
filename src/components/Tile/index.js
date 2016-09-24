import React, { PropTypes as T } from 'react';

/**
 * Simple Tile Stateless Component
 */
const Tile = ({title, content}) => {
  return (
    <div className='tile'>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  )
};

Tile.propTypes =  {
  title: T.string,
  content: T.string
};

export default Tile;
