import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.less'
export default class BottomToast extends Component {
  constructor(props) {
    super(props)
    
  }
  render() {
    const { isShow,content} = this.props;
    return (
      <div className={classnames({"bottom-toast":true,"bottom-toast-show":isShow})}  role="bottom-modal">
        {content}
      </div>
    )
  }
}


BottomToast.propTypes = {
  isShow:PropTypes.bool.isRequired
}