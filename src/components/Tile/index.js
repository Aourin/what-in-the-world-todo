import React, { PropTypes as T } from 'react';
import './tile-style.scss';
/**
 * Simple Tile Stateless Component
 */
const Tile = ({title, tag, onClick, badge}) => {
  const classNames = typeof onClick === 'function' ? 'tile cursor--pointer' : 'tile';
  let badgeItem, tagItem;
  if (badge) {
    badgeItem = <span className='badge f-right bg-green'>{badge}</span>;
  }
  if (tag) {
    tagItem = <span className='f-left '><i className='fa fa-user' /> {tag}</span>;
  }
  return (
    <div className={`${classNames} tile--border`} onClick={onClick}>
      <div className='tile__header'>{title}</div>
      <div className='tile__footer'>
        {tagItem}
        {badgeItem}
      </div>
    </div>
  );
};

Tile.propTypes =  {
  title: T.string,
  content: T.string,
  onClick: T.func,
  badge: T.any
};

export default Tile;
