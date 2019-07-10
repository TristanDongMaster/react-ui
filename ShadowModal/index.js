import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.less'
import classnames from 'classnames'
export default class ShadowModal extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { title, subTitle, isShow, handleClick, children} = this.props
    var isShowClass = classnames('shadow-modal',{'hide-shadow': isShow !=true })
    var isShowClassContainer = classnames('shadow-container',{'hide-container': isShow !=true })
    return (
      <div className={isShowClass}>
        <div className={isShowClassContainer}>
          <div className="shadow-head">
            <div className="close" onClick={handleClick}>
             <i className="icon-close-pay"></i>
            </div>
            <div className="title">{title}</div>
            <div className="sub-title">{subTitle}</div>
          </div>
          <div className="content">
              {children}
          </div>
        </div>
      </div>
    )
  }
}

ShadowModal.propTypes = {
  title: PropTypes.string.isRequired,
  isShow: PropTypes.bool,
  handleClick:  PropTypes.func.isRequired
}
