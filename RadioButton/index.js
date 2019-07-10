import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

export default class RadioButton extends Component {
  constructor(props) {
      super(props);
      this.renderId = this.renderId.bind(this);
  }

  componentWillMount(){
    this.state={idWithPrefix: this.renderId()};
  }

  renderId(prefix="radios_"){
    const{id} = this.props;
    return `${prefix}${id}`;
  }

  render() {
    const {id, text, value, isDisabled, isChecked, handleClick} = this.props;
    var classes = classnames('ui-radio-simulation', {'icon-selected': isChecked}, {'icon-unselected': !isChecked});
    return(
      
            
      <div className="ui-radio-group" onClick={handleClick}>
        <span className="ui-radio">
          <input type="radio" name={this.state.idWithPrefix} className="ui-radio-normal" checked={isChecked} disabled={isDisabled} readOnly />
          <i htmlFor={this.state.idWithPrefix} className={classes}></i>
        </span>
        <label htmlFor={this.state.idWithPrefix} className="ui-label">{text}</label>
      </div>
          
    )
  }
}

RadioButton.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool
}
//isDisabled如果不设置，默认值是false，可点击
//isChecked如果不设置，默认值是false，未选中
RadioButton.defaultProps = {
  isChecked: false,
  isDisabled: false
}











