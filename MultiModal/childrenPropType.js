import React from 'react';

module.exports = function childrenPropTypes(props, propName) {
  let error;
  let mainsCount = 0;
  let subsCount = 0;
  const children = props[propName];

  React.Children.forEach(children, (child) => {
    if (child === null) {
      return;
    }

    if (child.type.displayName === 'MultiMain') {
      
      React.Children.forEach(child.props.children, (c) => {
        if (c === null) {
          return;
        }else{
          mainsCount++;
        }
      });
    }else if (child.type.displayName === 'MultiSub') {
      subsCount++;
    }else{
      error = new Error(
        `MultiModal组件下应该是 'MultiMain' 'MultiSub'  但你填写的是 '${child.type.displayName || child.type}'`
      );
    }
  });

  if (mainsCount < 1 || subsCount <1 ) {
    error = new Error(
      "缺少MultiMain和MultiSub" +
      `收到 ${mainsCount} 'MultiMain' and ${subsCount} 'MultiSub'.`
    );
  }

  return error;
};

