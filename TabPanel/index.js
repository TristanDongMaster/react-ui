import React, { Component } from 'react'
import PropTypes from 'prop-types'



export default class TabPanel extends Component {
  constructor(props) {
      super(props);   
      this.state = {selected: false,
                     id: null,
                     tabId: null};
  }

  render() {
    const{children, selected, id, tabId}=this.props;
    return(
      <div className="tab-content"
        role="tabpanel"
        id={id}
        aria-labelledby={tabId}
        style={{ display: selected ? null : 'none' }}
      >
        {(selected) ? children : null}
      </div>
    )
  }
}


TabPanel.propTypes = {
    id: PropTypes.string,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    panelId: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
}











