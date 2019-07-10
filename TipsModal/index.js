import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'
import SearchInput from '../SearchInput'
export default class TipsModal extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {title, isShow, children, handleHide, closeText} = this.props;
    var classes = classnames('tipsmodal-fullpage',{'modal-show': isShow});
    
    return (
      <div className={classes} role="dialog" >
        <div className="tipsmodal-header">
          <div className="head">
            <p className="h2">{title}</p>
          </div>
        </div>
        <div className="tipsmodal-body">
          {children}
        </div>
        <div className="tipsmodal-bottom-fixed">
          <a className="item-bottom-btn" role="button" onClick={handleHide}>
            <i className="icon-cross"></i>
          </a>
        </div>
      </div>
    )
  }
}

TipsModal.propTypes = {
    title: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
    handleHide: PropTypes.func,
    closeText: PropTypes.string
}