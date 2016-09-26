import React, { Component, PropTypes as T } from 'react';
import './flex-container-styles.scss';

/**
 * Simple Container that handles rendering flex panels with size and children
 */
export default class FlexRouteContainer extends Component {
  static propTypes = {
    panels: T.array
  };

  render () {
    const { panels } = this.props;

    //  Iterates and maps out flex panels with passed sizes
    const flexPanels = panels.map((panel, idx) => {
      let component = panel.children;

      //  Will render a component if passed as a panel prop
      if (panel.component) {
        component = <panel.component />
      }

      return (
        <div
          key={idx}
          className='flex-panel'
          style={{ flex: panel.size }}>
          {component}
        </div>
      );
    });

    return (
      <div className='flex-container'>
        {flexPanels}
      </div>
    );
  }
}
