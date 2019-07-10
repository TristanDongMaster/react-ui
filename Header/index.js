import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import extend from 'lodash/extend'
import './style.less'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.back = this.back.bind(this)
    this.close = this.close.bind(this)
    this.handleClick = this.props.handleClick
    this.closeClick = this.props.closeClick
    var hideHeader = false
    this.hideHeader = hideHeader
  }
  
  back(e){
    if(!!this.handleClick){
       this.handleClick()
       return
    }
    history.back();
  }
  close(){
    if(!!this.closeClick){
      this.closeClick()
    }
  }
  render() {
    const { title ,subTitle,isHide , iconUrl, leftButtonMenu, rightButtonMenu} = this.props
    var defLeftButtonMenu = {
      isShow: true,
      iconClassName: 'icon-arrow icon-arrow-left',
      clickEventMethod:function(){
        history.go(-1)
      }
    }
    var defRightButtonMenu = {
      isShow: true,
      buttonText: '',
      clickEventMethod:function(){
        // do nothing
      }
    }
    var hasSubTitle = subTitle != undefined && subTitle != ''
    var _leftButtonMenu = extend({},defLeftButtonMenu,leftButtonMenu)
    var _rightButtonMenu = extend({},defRightButtonMenu,rightButtonMenu)

    return (
      <header className={classnames('header',{'hide':this.hideHeader||isHide})}>
        <div className={classnames('header-opt','header-left',{'hide':!_leftButtonMenu.isShow})} >
          <i className={_leftButtonMenu.iconClassName} onClick={_leftButtonMenu.clickEventMethod}></i>
        </div>

          <div className="header-text">
            <img src={iconUrl} alt="" className={classnames({'hide':!iconUrl})}  />
            {
              hasSubTitle == false?
              <span className="header-title">{title}</span>:
              <div className='header-text-flex'>
                <span className="header-title">{title}</span>
                <span className='sub-header-text'>{subTitle}</span>
              </div>
            }
          </div>


        <div className={classnames('header-opt','header-right',{'hide':!_rightButtonMenu.isShow})}>
          <span className={classnames({'hide':!_rightButtonMenu.buttonText})}
            onClick={_rightButtonMenu.clickEventMethod}>
            {_rightButtonMenu.buttonText}
          </span>
          <i className={classnames({'hide':!_rightButtonMenu.iconClassName},_rightButtonMenu.iconClassName)}
            onClick={_rightButtonMenu.clickEventMethod}></i>
        </div>
      </header>
    )
  }
}

/**
  title   页头标题文本
  isHide  是否显示头部
  iconUrl  页头icon
  leftButtonMenu 页头左侧按钮配置信息
    isShow 是否显示箭头，默认显示
    iconClassName 显示其他icon 参考字体样式
    clickEventMethod 点击事件，默认是回到上一页
  rightButtonMenu 页头右侧按钮配置信息
    isShow 是否显示箭头，默认显示
    buttonText 显示文本；buttonText、iconClassName只能有一个
    iconClassName 显示其他icon 参考字体样式
    clickEventMethod 点击事件，默认不处理
**/
Header.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle:PropTypes.string,
  isHide: PropTypes.bool,
  iconUrl: PropTypes.string,
  leftButtonMenu: PropTypes.shape({
    isShow: PropTypes.bool,
    iconClassName: PropTypes.string,
    clickEventMethod:PropTypes.func
  }),
  rightButtonMenu:PropTypes.shape({
    isShow: PropTypes.bool,
    iconClassName: PropTypes.string,
    buttonText: PropTypes.string,
    clickEventMethod:PropTypes.func
  })
}



