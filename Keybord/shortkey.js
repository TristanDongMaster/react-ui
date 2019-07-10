import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.less'
export default class ShortKey extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      id,
      placeholder
    } = this.props
    return (
      <div className="short-pass">
        <input type="text" 
          readOnly="readonly" 
          id={id}
          name={id}
          className="default short-input" />
        <ul className={classnames(id,'short-ul')}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    )
  }
}

ShortKey.propTypes = {
  id: PropTypes.string.isRequired
}











