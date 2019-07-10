import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'
export default class Dialog extends Component {
  constructor(props) {
    super(props)
    const {contentData} = this.props
    this.contentData = contentData
  }
  render() {
    const { contentData, isShow, children, style, isBodyTop} = this.props;
    var styleName = style?style:''
    var classes = classnames(styleName,
      {'dialog-overlay': true},
      {'hide': isShow==false},
    );

    var classesContainer = classnames(
      {'dialog-container': true},
      {'animate-hide': isShow==false}
    );

    var classesTitle = classnames(
      {'dialog-header': true},
      {'hide': contentData.title == undefined || contentData.title == ''}
    );

    var classesBody = classnames(
      {'dialog-body':true},
      {'dialog-body-top': isBodyTop}
    );

    var classesContent = classnames(
      {'dialog-text': true},
      {'hide': contentData.content == undefined || contentData.content == ''}
    );

    var classesLeft = classnames(
      {'col col-50 dialog-action action-left opacity-active': true},
      {'hide': contentData.buttonLeftText == undefined || contentData.buttonLeftText == ''}
    );

    var classesRight = classnames(
      {'col col-50 dialog-action action-right opacity-active': true},
      {'hide': contentData.buttonRightText == undefined || contentData.buttonRightText == ''}
    );

    var classesCenter = classnames(
      {'col dialog-action opacity-active': true},
      {'hide': contentData.buttonCenterText == undefined || contentData.buttonCenterText == ''}
    );

    var classesClose = classnames(
      {'icon-close-pay opacity-active':true,'hide': contentData.isShowClose != true }
    );

    var classesFooter =  classnames(
      {'dialog-footer opacity-active':true,'hide': contentData.buttonCenterText == undefined && contentData.buttonRightText == undefined &&  contentData.buttonLeftText == undefined}
    ); 
  
    return (
          <div className={classes} role="dialog">
            <div className={classesContainer}>
             <i className={classesClose} onClick={contentData.buttonCloseEventMethod}></i>
              <div className={classesTitle}>{contentData.title || ''}</div>
              <div className={classesBody}>
                <div className={classesContent}>{contentData.content || ''}</div>
                {children}
              </div>
              <div className={classesFooter}>
                <span className={classesLeft} onClick={contentData.buttonLeftEventMethod}>{contentData.buttonLeftText}</span>
                <span className={classesRight} onClick={contentData.buttonRightEventMethod}>{contentData.buttonRightText}</span>
                <span className={classesCenter} onClick={contentData.buttonCenterEventMethod}>{contentData.buttonCenterText}</span>
              </div>
            </div>
          </div>
    )
  }
}


Dialog.propTypes = {
  contentData:PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      buttonLeftText: PropTypes.string,
      buttonLeftEventMethod: PropTypes.func,
      buttonRightText: PropTypes.string,
      buttonRightEventMethod:PropTypes.func,
      buttonCenterText: PropTypes.string,
      buttonCenterEventMethod:PropTypes.func,
      isShowClose:PropTypes.bool,
      buttonCloseEventMethod:PropTypes.func,
    }).isRequired,
  children: PropTypes.node,
  isShow:PropTypes.bool.isRequired,
  style:PropTypes.string,
  isBodyTop:PropTypes.bool
}