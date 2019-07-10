import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../../actions/AppActions'
import classnames from 'classnames'
import Input from '../Input'
import format from '../util/format'
import {getSeg} from '../util/format'
export default class SmartInput extends Component {
  constructor(props) {
      super(props);
  } 

  render() {
    const { title,
            defaultValue,
            id,
            placeholder,
            isWithTitle,
            isError,
            writeValue,
            formatType,
            inputType,
            blurFn,
            focusFn,
            inputFn,
            numberStep,
            maxLength,
            beforeInputFn
          } = this.props
    const fnMap = {
      card: 'card_split',
      mobile: 'mobile_split',
      id: 'idcard_split',
      expire: 'expire_split',
      cvv2: 'cvv2_split'
    }  

    function formatSegSyntax(){
      if(typeof fnMap[formatType]==='undefined'){
        return [];
      }
      else{
        return getSeg(fnMap[formatType])
      }
    }

    const _inputType =  typeof fnMap[formatType]!=='undefined'&&fnMap[formatType]!=='idcard_split'?'tel':inputType===undefined?'text':inputType
    return (
      <div className={classnames('ipt-container',{'ipt-container-without-title':!isWithTitle})}>
        <div className="ipt-title">{title}</div>
        <div className="ipt-body">
            <Input 
              defaultValue={defaultValue}
              type={_inputType}
              placeholder={placeholder}
              id={id}
              isError={isError}
              writeValue={writeValue}
              formatFn={fnMap[formatType]}
              formatSeg={formatSegSyntax}
              blurFn={blurFn}
              focusFn = {focusFn}
              inputFn={inputFn}
              numberStep={numberStep}
              maxLength={maxLength||999}
              beforeInputFn={beforeInputFn}/>
        </div>
      </div>
    )
  }
}

SmartInput.propTypes = {
  title:PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  writeValue: PropTypes.func.isRequired,
  isWithTitle: PropTypes.bool.isRequired,
  formatType: PropTypes.string,
  inputType: PropTypes.string,
  blurFn: PropTypes.func,
  inputFn: PropTypes.func,
  focusFn: PropTypes.func,
  maxLength:PropTypes.number,
  beforeInputFn:PropTypes.func,
}











