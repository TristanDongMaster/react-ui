import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.less'
export default class Longkey extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      id,
      placeholder
    } = this.props
    return (
      <input 
        onClick={()=>{}}
        type="text" 
        readOnly="readonly" 
        id={id} 
        placeholder={placeholder}
        className="default longkey-input"/>
    )
  }
}

Longkey.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
}











