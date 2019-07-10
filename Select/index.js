import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'
export default class Select extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this);
    
  }

  handleOnChange(e){
    var value = e.target.value;
    const { onChange } = this.props
    onChange(value);
  }

  render() {
    const { selected, placeholder , options , schemaLabel , schemaValue , onChange } = this.props
    var classes = classnames('select',
        {'placeholder': !selected});
    if(schemaValue !== undefined && schemaLabel !== undefined){
      return (
        <div className="ui-select-group">
          <select className={classes} defaultValue={selected} onChange={this.handleOnChange}>

              
              {options.map(function(item, i){
                return <option key={i} value={item[schemaValue]}>{item[schemaLabel]}</option>;
              })}
          </select>
        </div>
      )
    }
    
    return (
      <div className="ui-select-group">
        <select className={classes} defaultValue={selected} onChange={this.handleOnChange}>

            <option value="" disabled hidden>{placeholder}</option> 
            {options.map(function(item, i){
              return <option key={i} value={item}>{item}</option>;
            })}
        </select>
      </div>
    )
  }
}

Select.propTypes = {
  selected: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  schemaLabel: PropTypes.string,
  schemaValue: PropTypes.string,
  onChange: PropTypes.func
}