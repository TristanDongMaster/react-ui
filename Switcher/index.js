import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'

export default class Switcher extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.renderId = this.renderId.bind(this);
    this.getRandomId = this.getRandomId.bind(this);
  }

  componentWillMount(){
    this.state={idWithPrefix: this.renderId()};
  }

  renderId(prefix="switchers_"){
    const{id} = this.props;
    if(id === undefined) return `${prefix}${this.getRandomId()}`;
    return `${prefix}${id}`;
  }

  getRandomId(){
    return Math.floor(Math.random() * 100 +1);
  }

  toggle(){
    const{isOn, handleToggle} = this.props;
    handleToggle(!isOn);
  }

  render() {
    const{id, isOn} = this.props;
    
    return (
      <div id={id} className="onoffswitch" onClick={this.toggle}>
          <input type="checkbox" name={this.state.idWithPrefix} className="onoffswitch-checkbox" checked={isOn} readOnly />
          <label className="onoffswitch-label" htmlFor={this.state.idWithPrefix}>
              <span className="onoffswitch-inner"></span>
              <span className="onoffswitch-switch"></span>
          </label>
      </div>
    )
  }
}

Switcher.propTypes = {
    isOn:PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired
}