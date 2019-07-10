import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'

import uuid from './uuid';
import childrenPropType from './childrenPropType';
import './style.less'

export default class Tabs extends Component {
  constructor(props) {
      super(props);   
      this.state = { selectedIndex: 0 };
      this.getChildren = this.getChildren.bind(this);
      this.getTabsCount = this.getTabsCount.bind(this);
      this.clickHandler = this.clickHandler.bind(this);
  }

  getTabsCount() {
    return this.props.children && this.props.children[0] ?
            React.Children.count(this.props.children[0].props.children) :
            0;
  }

  setSelected(index) {
    if (index === this.state.selectedIndex) return;
    if (index < 0 || index >= this.getTabsCount()) return;
    const last = this.state.selectedIndex;

    let cancel = false;

    // Call change event handler
    if (typeof this.props.onSelect === 'function') {
      cancel = this.props.onSelect(index, last) === false;
    }

    if (!cancel) {
      this.setState({selectedIndex: index});
    }
  }

  getChildren() {
    let index = 0;
    let count = 0;
    const children = this.props.children;
    const state = this.state;
    const tabIds = this.tabIds = this.tabIds || [];
    const panelIds = this.panelIds = this.panelIds || [];
    let diff = this.tabIds.length - this.getTabsCount();

    while (diff++ < 0) {
      tabIds.push(uuid());
      panelIds.push(uuid());
    }

    return React.Children.map(children, (child) => {
      if (child === null) {
        return null;
      }

      let result = null;
      if (count++ === 0) {
        result = cloneElement(child, {
          ref: 'tablist',
          children: React.Children.map(child.props.children, (tab) => {
            if (tab === null) {
              return null;
            }

            const ref = `tabs-${index}`;
            const id = tabIds[index];
            const panelId = panelIds[index];
            const selected = state.selectedIndex === index;
            const handleClick = this.clickHandler;
            
            index++;

            return cloneElement(tab, {
              ref,
              id,
              panelId,
              selected,
              handleClick,
            });
          }),
        });

        index = 0;
      }
      else {
        const ref = `panels-${index}`;
        const id = panelIds[index];
        const tabId = tabIds[index];
        const selected = state.selectedIndex === index;
        
        index++;

        result = cloneElement(child, {
          ref,
          id,
          tabId,
          selected,
        });
      }

      return result;
    });
  }


  clickHandler(e){
    let node = e.target;
    const index = [].slice.call(node.parentNode.children).indexOf(node);
    this.setSelected(index);
  }

  render() {
    const {children}=this.props;
    
    return (
      <div>
      {this.getChildren()}
      </div>
    )
  }
}


Tabs.propTypes = {
  children: childrenPropType,
  onSelect: PropTypes.func
}











