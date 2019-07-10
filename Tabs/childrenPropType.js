import React from 'react';
import TabButton from '../TabButton';
import TabList from '../TabList'

module.exports = function childrenPropTypes(props, propName) {
  let error;
  let tabsCount = 0;
  let panelsCount = 0;
  const children = props[propName];

  React.Children.forEach(children, (child) => {
    if (child === null) {
      return;
    }

    if (child.type === TabList) {
      
      React.Children.forEach(child.props.children, (c) => {
        if (c === null) {
          return;
        }

        if (c.type === TabButton) {
          tabsCount++;
        } else {
          error = new Error(
            `Tabs组件下的TabList下应该是 'TabButton' 但你填写的是 '${c.type.displayName || c.type}'`
          );
        }
      });
    }else if (child.type.displayName === 'TabPanel') {
      panelsCount++;
    }else{
      error = new Error(
        `Tabs组件下应该是 'TabList' 'TabPanel'  但你填写的是 '${child.type.displayName || child.type}'`
      );
    }
  });

  if (tabsCount !== panelsCount) {
    error = new Error(
      "TabButton和TabPanel数量不一致" +
      `收到 ${tabsCount} 'TabButton' and ${panelsCount} 'TabPanel'.`
    );
  }

  return error;
};

