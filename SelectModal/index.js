import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'
export default class SelectModal extends Component {
  constructor(props) {
    super(props)
    const {contentData} = this.props
    this.contentData = contentData
  }
  render() {
    const { contentData, isShow, children} = this.props;
    var items = contentData.items
    var length = items.length
    var classes = classnames(
      {'select-modal-overlay': true},
      {'hide': isShow==false}
    );

    var classesContainer = classnames(
      {'modal-container': true},
      {'animateHide': isShow==false}
    );

    var classesTitle = classnames(
      {'modal-header modal': true},
      {'hide': contentData.title == undefined || contentData.title == ''}
    );
    var classesBody = classnames(
      {'modal-body': true},
      {'first-border-radius': contentData.title == undefined || contentData.title == ''}
    );
    var classesFooter = classnames(
      {'modal-footer': true},
      {'hide': contentData.closeText == undefined || contentData.closeText == ''}
    );

   
  
    return (
          <div className={classes}   role="select-modal" onClick={() =>{
            contentData.closeEventMethod()
          }}>
            <div className={classesContainer}>
              <div className={classesTitle}>{contentData.title}</div>
              <div className={classesBody}>
                {
                  items.map((value, index) => {
                      return (
                        <div key={index}  className='modal' onClick={() =>{
                          contentData.closeEventMethod()
                          value.event()
                        }}>
                         {value.text}
                        </div>
                      )
                    })
                }
              </div>
              <div className="modal-footer" onClick={contentData.closeEventMethod}>{ contentData.closeText}</div>
            </div>
          </div>
    )
  }
}


SelectModal.propTypes = {
  contentData:PropTypes.shape({
      title: PropTypes.string,
      closeText: PropTypes.string.isRequired,
      closeEventMethod: PropTypes.func.isRequired,
      items: PropTypes.array.isRequired
    }).isRequired,
  children: PropTypes.node,
  isShow:PropTypes.bool.isRequired
}