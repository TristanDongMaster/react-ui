import React, { Component } from 'react'
import PropTypes from 'prop-types'



export default class TabList extends Component {
  constructor(props) {
      super(props);   
      
  }

  render() {
    const{children}=this.props;
    return(
      <div
        role="tablist" className="tabs"
      >
        {children}
      </div>
    )
  }
}


TabList.propTypes = {
  children: PropTypes.node.isRequired
}











