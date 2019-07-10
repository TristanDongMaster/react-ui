import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
import './style.less';
import childrenPropType from './childrenPropType';
export default class MultiModal extends Component {
  constructor(props) {
    super(props);
    this.getChildren = this.getChildren.bind(this);
  }

  getChildren() {
    let index = 0;
    let count = 0;
    const children = this.props.children;
        
    return React.Children.map(children, (child) => {
      if (child === null) {
        return null;
      }

      let result = null;
      if (count++ === 0) {
        result = cloneElement(child, {
          ref: 'main',
          children: React.Children.map(child.props.children, (tab) => {
            if (tab === null) {
              return null;
            }

            const ref = `main-${index}`;
            index++;

            return cloneElement(tab, {
              ref,
            });
          }),
        });

        index = 0;
      }
      else {
        const ref = `sub-${index}`;
        const id = index+1;
        const selected = this.props.currentIndex === id;
        index++;
        result = cloneElement(child, {
          ref,
          selected
        });
      }

      return result;
    });
  }
  
  render() {
    const { isShow, children, currentIndex} = this.props;
    var classes = classnames(
      {'multi-modal-overlay': true},
      {'animateHide': isShow==false}
    );

    var classesContainer = classnames(
      {'modal-container': true},
      {'animateHide': isShow==false}
    );
    var classInner = classnames(
      "multi-modal-contents",
      {
        'animateRight': currentIndex>0
      });
    return (
      <div className={classes}  role="multi-modal">
        <div className="multi-modal-wrapper">
          <div className="multi-modal-mask"></div>
          <div className={classesContainer}>
            <div className={classInner}>
              {this.getChildren()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MultiModal.propTypes = {
  children: childrenPropType,
  isShow: PropTypes.bool.isRequired,
  currentIndex: PropTypes.number.isRequired
}
