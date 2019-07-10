import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'

export default class Label extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { title,content,tip ,iconClassName, isContentRight, isContentTipRight,
      titleStyle,contentStyle,tipStyle ,iconClick, children} = this.props
    var titleClass =  classnames('label-title',{[`${titleStyle}`]:titleStyle})  
    var contentClass =  classnames('label-content',{'content-right':isContentRight},{[`${contentStyle}`]:contentStyle})  
    var contentTipClass =  classnames('label-tip',{'content-right':isContentTipRight},{[`${tipStyle}`]:tipStyle})  
    return (
      <div className="label-wrap">
        
        {
          !!title?<div className={titleClass}>{title}</div>:''
        }
        {
          !!children?<div className={contentClass}>{children}</div>:''
        }
        {
          !!content?<div className={contentClass}>{content}</div>:''
        }
        {
          !!tip?<div className={contentTipClass}>{tip}</div>:''
        }
        {
          iconClassName == 'none' ?'':
          !!iconClassName?
          <div className="label-icon" onClick={iconClick}><i className={iconClassName}></i></div>
          :
          <div className="label-icon" onClick={iconClick}><i className="icon-arrow"></i></div>
        }
        
        
      </div>
    )
  }
}
/**
  title 标题
  content 内容
  tip 提示
  iconClassName icon 样式，默认是箭头
**/
Label.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  tip: PropTypes.string,
  iconClassName: PropTypes.string,
  isContentRight:PropTypes.bool,
  iconClick:PropTypes.func,
  children: PropTypes.node
}
