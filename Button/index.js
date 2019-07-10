import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'
export default class Button extends Component {
  constructor(props) {
    super(props)
    const { style } = this.props
    this.state = {
      btnStyle : !!style?style:'btn-basic'
    }
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
  }
  onTouchStart (){
    var styles = this.state.btnStyle
    if(!styles.includes(' active')){
      this.setState({
        btnStyle: styles +' active'
      })
    }
  }
  onTouchEnd (){
    var styles = this.state.btnStyle
    if(styles.includes('active')){
      this.setState({
        btnStyle: styles.replace(' active', '')
      })
    }
  }
  render() {
    const { text , isAble , handleClick , style } = this.props
    var _handleClick = !!handleClick?handleClick:function(){}
    return (
      <button className={classnames('btn',this.state.btnStyle)}
        disabled={!isAble}
        onTouchStart = {this.onTouchStart}
        onTouchEnd = {this.onTouchEnd}
        onTouchCancel = {this.onTouchEnd}
        onClick={_handleClick}>{text}</button>
    )
  }
}

/**
  text 按钮文字
  isAble 按钮是否可用
  style 按钮样式，固定样式组合
  handleClick 按钮点击函数
**/
Button.propTypes = {
  text: PropTypes.string.isRequired,
  isAble: PropTypes.bool.isRequired,
  style: PropTypes.string,
  handleClick: PropTypes.func
}