import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.less'
export default class Broadcast extends Component {
  render() {
    var { isShow, description} = this.props;
    var classShow = "broadcast-ct" 
     var descriptionClass = 'description'
    if(isShow == false || isShow == undefined || description == '' ||  description == undefined){
      classShow = "broadcast-ct broadcast-hide" 
    }else{
        var length = description.length
        let scrollWidth = document.body.scrollWidth || 320
        let count = (scrollWidth - 40 )*21/280
        if(length<=count){
          descriptionClass += " roll-stop"
        }
        else if(length<=40){
          descriptionClass += " roll-sm"
        }
        else if(length<=60){
          descriptionClass += " roll-mid"
        }
        else{
          descriptionClass += " roll-lg"
        }
    }

    return (
      <div  className={classShow}>
        <span className ='description-icon' >
           <i className="icon-broadcast"></i>
        </span>
        <div className={descriptionClass} >
          {description!=undefined?description:''}
        </div>
        <span className='gradient-cover'></span>
      </div>
    )
  }
}

Broadcast.propTypes = {
  description:PropTypes.string,
  isShow:PropTypes.bool.isRequired,
}
