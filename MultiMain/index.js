import React, { Component } from 'react'
import PropTypes from 'prop-types'



export default class MultiMain extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    const{children}=this.props;
    return(
      <div className="multi-modal-content" role="multimain">
        {children}
      </div>
    )
  }
}


MultiMain.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
}