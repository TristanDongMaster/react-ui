import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.less'
import childrenPropType from './childrenPropType';
import RadioButton from '../RadioButton';

export default class Radio extends Component {
  constructor(props) {
      super(props);
  }

  toggle(item, e){
    const{dataFields, handleToggle}=this.props;
    if( !item.isDisabled && !item.isChecked) handleToggle(item.value);
  }

  getChildren() {
    let index = 0;
    const children = this.props.children;

    return React.Children.map(children, (child) => {     
      if(child.type !== RadioButton) return null; 
      let result = null;
      const key = `${index}`;
      const id = `${index}`;
      let boundItemClick = this.toggle.bind(this, child.props);
      const handleClick = boundItemClick;
      index++;
      
      result = cloneElement(child, {
                              key,
                              id,
                              handleClick
                            });
      
      return result;
    });
  }



  render(){
    return(
      <div>
      {this.getChildren()}
      </div>
    );
  }
}

Radio.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  children: childrenPropType
}











