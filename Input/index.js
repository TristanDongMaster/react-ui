import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'
import format from '../util/format'

let inputTimer = {
   timeId:'',
   timeout:'',
}
export default class Input extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleDelClick = this.handleDelClick.bind(this)
    this.handleViewPass = this.handleViewPass.bind(this)
    this.handleKey = this.handleKey.bind(this)
    this.handlePaste = this.handlePaste.bind(this)

    const {  id,writeValue ,value ,formatFn, blurFn, inputFn, focusFn, inputEndFn, formatSeg, customFormat,maxLength,beforeInputFn} = this.props
    this.id = id
    this.writeValue = writeValue
    this.formatFn = formatFn
    this.blurFn = blurFn
    this.inputFn = inputFn
    this.focusFn = focusFn
    this.inputEndFn = inputEndFn
    this.formatSeg = formatSeg
    this.isDeleted = false
    this.isPaste = false
    this.customFormat = customFormat
    this.maxLength = maxLength || 999
    this.beforeInputFn = beforeInputFn
  }
  componentWillMount(){
    this.setState({
      isDel: false,
      isSeePass: false
    })
    
  }
  componentWillUnmount(){
    clearTimeout(inputTimer.timeId)
    clearTimeout(inputTimer.timeout)
  }
 
  handleInput(e){
    if(this.beforeInputFn){
      this.beforeInputFn(e)
    }
    var val = e.target.value
    var len = val.length;
    if(len > this.maxLength){
      e.target.value = val.substring(0,this.maxLength)
      return  
    }
    if(typeof this.formatFn !== 'undefined'){
      var ctrl = this.getCursortPosition(e.target);
      if(!this.isDeleted){
        var formatSegAry = this.formatSeg();
        ctrl = this.moveCtrl(formatSegAry, ctrl);
      }

      if(format(val,this.formatFn)!==val){
        this.writeValue(format(val,this.formatFn))
        e.target.value = format(val,this.formatFn)
      }
      else{
        this.writeValue(val)
      }
      if(this.isPaste){
        ctrl = e.target.value.length;
      }
      if(ctrl == 0){
        // fix note 4 bug
        return
      }
      this.setCaretPosition(e.target, ctrl);
    }
    else{
      if(typeof this.customFormat !== 'undefined'){
        this.customFormat(e)
        val = e.target.value
        this.writeValue(val)
      }else{
        this.writeValue(val)
      }
    }
    this.isDeleted = false;
    this.isPaste = false;
    if(this.inputFn){
      this.inputFn(val)
    }
  }

  moveCtrl(formatSegAry, ctrl){
    for(var i = 0; i<formatSegAry.length; i++){
      if(formatSegAry[i] == ctrl){
        ctrl++;
      }
    }
    return ctrl;
  }

  movePreCtrl(formatSegAry, ctrl){
    for(var i = 0; i<formatSegAry.length; i++){
      if(formatSegAry[i] + 1 == ctrl){
        ctrl--;
      }
    }
    return ctrl;
  }

  getCursortPosition(ctrl) {//获取光标位置函数
      var CaretPos = 0;
      if (document.selection) {
          ctrl.focus ();
          var Sel = document.selection.createRange ();
          Sel.moveStart ('character', -ctrl.value.length);
          CaretPos = Sel.text.length;
      }else if(ctrl.selectionStart || ctrl.selectionStart == '0'){
          CaretPos = ctrl.selectionStart;
      }
      return (CaretPos);
  }

  setCaretPosition(ctrl, pos){//设置光标位置函数
      inputTimer.timeId = setTimeout(function(){
        if(ctrl.setSelectionRange)
        {
            ctrl.focus();
            ctrl.setSelectionRange(pos,pos);
        }
        else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
        clearTimeout(inputTimer.timeId);
      },10);
  }
  handleKey(e){
    var hasFormat =  this.formatSeg ? this.formatSeg().length != 0 : false;
    if(e.keyCode == 8 && this.formatSeg && hasFormat){
      var ctrl = this.getCursortPosition(e.target);
      var formatSegAry = this.formatSeg();
      ctrl = this.movePreCtrl(formatSegAry, ctrl);
      this.isDeleted = true;
    }
  }
  handleFocus(e){
    this.setState({isDel: true})
    if(this.focusFn){
      this.focusFn()
    } 
  }
  handleBlur(e){
    const self = this
    inputTimer.timeout = setTimeout(function(){
      const val = self.refs[self.id].value
      self.setState({isDel: false})
      if(self.blurFn) {
        self.blurFn(val)
      }
      clearTimeout(inputTimer.timeout)
    },300)
  }
  handleDelClick() {
    this.writeValue('')
    this.refs[this.id].value = ''
  }

  handleViewPass(){
    this.setState({isSeePass: !this.state.isSeePass})
  }
  handlePaste(){
    this.isPaste = true;
  }
  render() {
    const { 
      id, 
      type , 
      placeholder,
      isError ,
      defaultValue,
      numberStep
    } = this.props
    var classes = classnames('ipt-wrap',
        {'ipt-error':isError},
        {'ipt-password':type==='password'})
    var isDel = this.state.isDel
    var delClasses = classnames('ipt-close',{'hide':!isDel})
    var _type = type==='password'&&this.state.isSeePass?'text':type


    return (
      <div className={classes}>
        <input 
          className="ipt de2" 
          type={_type} 
          ref={id}
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleInput}
          onKeyDown={this.handleKey}
          onPaste={this.handlePaste}
          step={numberStep}
          />
        <div 
          className={delClasses}
          onClick={this.handleDelClick}>
          <i className="icon-delet"></i>
        </div>
        <div className={classnames('ipt-see-pass',{'ipt-see-pass-open':this.state.isSeePass})}
          onClick={this.handleViewPass}>
          <i className="icon-view"></i>
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  writeValue: PropTypes.func.isRequired,
  formatFn: PropTypes.string,
  formatSeg: PropTypes.func,
  blurFn: PropTypes.func,
  focusFn: PropTypes.func,
  inputFn: PropTypes.func,
  inputEndFn: PropTypes.func,
  customFormat:PropTypes.func,
  maxLength:PropTypes.number
}