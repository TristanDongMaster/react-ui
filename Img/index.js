import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.showImg = this.showImg.bind(this)
    this.showErrorImg = this.showErrorImg.bind(this)
  }
  showImg(){
    this.refs.imgShow.className = 'block-img'
  }
  showErrorImg(){
    this.refs.imgShow.className = 'hide'
  }
  render() {
    const {
      src
    } = this.props
    return (
      <span>
        <img
          ref='imgShow'
          className="hide"
          src={src}
          onError={this.showErrorImg}
          onLoad={this.showImg}/>
      </span>
           
    )
  }
}

Index.propTypes = {
  
}
