import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'

export default class Checkbox extends Component {
  constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
  }

  toggle(){
    const{isDisabled, isChecked, handleToggle} = this.props;
    if(isDisabled) return;
    handleToggle(!isChecked);
  }


  render() {
    const {text, isDisabled, isChecked} = this.props;
    
    var classes = classnames('checkbox', {'checkkbox-default': !isDisabled}, {'checkkbox-disabled': isDisabled}, {'checkkbox-selected': isChecked});
    return (
      <div className="checkbox-item" role="checkbox" onClick={this.toggle}>
        <div className={classes}>
          <i className="icon-checkbox"></i>
        </div>
        <lable>{text}</lable>
      </div>
    )
  }
}

Checkbox.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  handleToggle: PropTypes.func.isRequired
}
//isDisabled如果不设置，默认值是false，可点击
//isChecked如果不设置，默认值是false，未选中
Checkbox.defaultProps = {
  isDisabled: false,
  isChecked: false
}











