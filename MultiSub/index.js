import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames';

export default class MultiSub extends Component {
  constructor(props) {
      super(props);
      this.state = {selected: false,animateHide:false};
  }
  componentWillReceiveProps(nextProps){
    const{selected}=nextProps;
    if(this.props.selected&&!selected){
      this.setState({animateHide:true});
      //bugfix:reset scrollTop after scroll multisub body
      let eles = document.querySelectorAll('[role="multisub"] .modal-body');
      let n = eles.length;
      for(var i=0;i<n;i++){
        eles[i].scrollTop = 0;
      }
    }else{
      this.setState({animateHide:false});
    }
  }
  render() {
    const{children, selected}=this.props;
    var classes = classnames(
      'multi-modal-content bg-white',
      {
        'hide': !selected&&!this.state.animateHide
      });
    return(
      <div role="multisub" className={classes}>
        {children}
      </div>
    )
  }
}


MultiSub.propTypes = {
    selected: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
}