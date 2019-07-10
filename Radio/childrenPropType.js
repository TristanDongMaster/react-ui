import React from 'react';
import RadioButton from '../RadioButton';

module.exports = function childrenPropTypes(props, propName) {
  let error;
  const children = props[propName];

  React.Children.forEach(children, (child) => {
    if (child === null) {
      return;
    }

    if (child.type !== RadioButton) {
      error = new Error(
        `Expected 'RadioButton' but found '${child.type.displayName || child.type}'`
      );
    } 
  });

  return error;
};

