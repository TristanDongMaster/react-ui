import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.less'
import classnames from 'classnames'
export default class FullModal extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { title, isShow, handleClick, text, children} = this.props
    var isShowClass = classnames('full-modal',{'hide': isShow !=true })
    return (
      <div className={isShowClass}>
        <div className="title">{title}</div>
        <div className="line"></div>
        <div className="content">
            {children}
            <div className="text" >
              {text}
            </div>
        </div>
        <div className="close" onClick={handleClick}>
         <i className="icon-cross"></i>
        </div>
      </div>
    )
  }
}

FullModal.propTypes = {
  title: PropTypes.string.isRequired,
  isShow: PropTypes.bool,
  text:PropTypes.string,
  handleClick:  PropTypes.func.isRequired
}
