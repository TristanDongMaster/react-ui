import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'
export default class BottomModal extends Component {
  constructor(props) {
    super(props)
    const {contentData} = this.props
    this.contentData = contentData
  }
  render() {
    const { isShow,arrayList,handleClick} = this.props;

    var classes = classnames(
      {'bottom-modal-overlay': true},
      {'hide': isShow==false}
    );

    var classesContainer = classnames(
      {'modal-container': true},
      {'animateHide': isShow==false}
    );

    return (
          <div className={classes}  role="bottom-modal">
            <div className={classesContainer}>
              <div className="modal-body">
                {
                  arrayList.map((item,index)=>{
                    return (
                      <div className='text' key={index} onClick={item.event}>
                      {item.title}
                      </div>
                    )
                  })
                }
              </div>
              <div className='modal-footer'>
                <div className="close" onClick={handleClick}>取消</div>
              </div>
            </div>
          </div>
    )
  }
}


BottomModal.propTypes = {
  isShow:PropTypes.bool.isRequired,
  handleClick:PropTypes.func.isRequired,
  arrayList:PropTypes.array.isRequired

}