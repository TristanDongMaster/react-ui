import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'
export default class HalfModal extends Component {
  constructor(props) {
    super(props)
    const {contentData} = this.props
    this.contentData = contentData
  }
  render() {
    const { contentData, isShow, children} = this.props;

    var classes = classnames(
      {'half-modal-overlay': true},
      {'hide': isShow==false}
    );

    var classesContainer = classnames(
      {'modal-container': true},
      {'animateHide': isShow==false}
    );

    var classesSubTitle = classnames(
      {'sub-title': true},
      {'hide': contentData.subTitle == undefined || contentData.subTitle == ''}
    );

    var classesIconEvent = classnames(
      {'hide': typeof contentData.iconEventMethod != 'function'}
    );

    var classesIconClassName =''
    if(contentData.iconClassName == undefined){
      classesIconClassName = 'hide'
    }else{
      classesIconClassName =contentData.iconClassName 
    }

    var classesContent = classnames(
      {'modal-text': true},
      {'hide': contentData.content == undefined || contentData.content == ''}
    );

    var classesFooter = classnames(
      {'modal-footer': true},
      {'hide': contentData.buttonText == undefined || contentData.buttonText == ''}
    );
  
    return (
          <div className={classes}  role="half-modal">
            <div className={classesContainer}>
              <div className="modal-header ">
                <span className="header-close" onClick={contentData.closeEventMethod}>
                  <i className="icon-close-pay "></i>
                </span>
                <span className="header-text">
                  <div className="title">
                    {contentData.title}
                  </div>
                  <div  className={classesSubTitle}>
                    {contentData.subTitle}
                  </div>
                </span>
                <span className="header-icon" onClick={contentData.iconEventMethod}>
                  <a className={classesIconEvent}> 
                    <i className={classesIconClassName} ></i>
                    <span className='more-text'>{contentData.iconText}</span>
                  </a>
                </span>
              </div>
              <div className="modal-body">
                <div className={classesContent}>
                   {contentData.content}
                </div>
                {children}
              </div>
              <div className={classesFooter}>
                <button className="btn btn-basic btn-full" onClick={contentData.buttonEventMethod}>{contentData.buttonText}</button>
              </div>
            </div>
          </div>
    )
  }
}


HalfModal.propTypes = {
  contentData:PropTypes.shape({
      title: PropTypes.string.isRequired,
      subTitle:PropTypes.string,
      buttonText:PropTypes.string,
      buttonEventMethod:PropTypes.func,
      closeEventMethod:PropTypes.func,
      iconEventMethod:PropTypes.func,
      iconClassName:PropTypes.string,
    }).isRequired,
  children: PropTypes.node,
  isShow:PropTypes.bool.isRequired
}