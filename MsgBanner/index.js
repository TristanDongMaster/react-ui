import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'

export default class MsgBanner extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { msgType,text,isShow } = this.props
    //msgType:  info error 
    if(msgType==='info'){
      return (
        <div className={classnames('msg-banner-info',{'hide':!isShow})}>
          {text}
        </div>
      )
    }
    else if(msgType==='error'){
      return (
        <div className={classnames('msg-banner',{'hide':!isShow})}>
          <i className="icon-delet"></i> {text}
        </div>
      )
    }
    
  }
}

MsgBanner.propTypes = {
  msgType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired
}
