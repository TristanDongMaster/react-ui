import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

export default class TabButton extends Component {
  constructor(props) {
      super(props);   
      this.state= {focus: false,
                     selected: false,
                     id: null,
                     panelId: null};
  }

  render() {
    const{selected, disabled, panelId, children, id, handleClick}=this.props;
    var classes = classnames('tab-link', {'active': selected});
    return(
      <div
        role="tabbutton" className={classes}
        id={id}
        aria-selected={selected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-controls={panelId}
        tabIndex={selected ? '0' : null}
        onClick={handleClick}
      >
        {children}
      </div>
    )
  }
}


TabButton.propTypes = {
    id: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    panelId: PropTypes.string,
    handleClick: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
}











