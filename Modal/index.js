import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'
import SearchInput from '../SearchInput'
export default class Modal extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {title, isShow, children, handleHide, closeText, okText, handleOk, searchWriteValue, handleSearch, showSearch} = this.props;
    var classes = classnames('modal-fullpage',{'modal-show': isShow});
    var showBottomCloseBtn = classnames('item item-bottom-btn',{'hide': !closeText});
    var showBottomOKBtn = classnames('item item-bottom-btn',{'hide': !okText});
    var headClasses = classnames('head',{'head-search': showSearch});
    var lineClasses = classnames('row h-line',{'hide': !showSearch});
    var search = showSearch? <SearchInput id="searchIpt" 
                                          placeholder="搜索分行" 
                                          isError={false}
                                          writeValue={searchWriteValue}
                                          handleSearch={handleSearch} /> : '';
    
    return (
      <div className={classes} role="dialog" >
        <div className="modal-header">
          <div className={headClasses}>
            <span className="h2">{title}</span>
            <div className={lineClasses}></div>
            {search}
          </div>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="force-repaint"></div>
        <div className="bottom-fixed">
          <a className={showBottomOKBtn} role="button" onClick={handleOk}>{okText}</a>
          <a className={showBottomCloseBtn} role="button" onClick={handleHide}>{closeText}</a>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
    handleHide: PropTypes.func,
    closeText: PropTypes.string,
    okText: PropTypes.string,
    handleOk: PropTypes.func,
    handleSearch: PropTypes.func,
    searchWriteValue: PropTypes.func,
    showSearch: PropTypes.bool
}