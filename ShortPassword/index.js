import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'

export default class ShortPassword extends Component {
  constructor(props) {
    super(props)
    this.inputChange = this.inputChange.bind(this)
    this.onChange = this.props.onChange
    this.onFocus = this.onFocus.bind(this)
    this.onFocusInput = this.onFocusInput.bind(this)
    this.onBlurInput = this.onBlurInput.bind(this)
    this.length = this.props.length || 6
    this.state = {
        clear:this.props.clear,
        value:'',
        autoFocus:'',
      }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.clear != this.state.clear ){
      this.setState({
        clear:nextProps.clear,
        value:''
      })
      this.refs.pswInputValue.value = ''
    }
    if(nextProps.autoFocus != this.state.autoFocus ){
      this.setState({
        autoFocus:nextProps.autoFocus,
      })
    }
  }
  componentDidUpdate(nextProps){
    if(nextProps.autoFocus != this.state.autoFocus){
      this.refs.pswInputValue.focus()
    }
  }
  inputChange($event){
    var value = $event.target.value
    if(value.toString().length>this.length){
      this.refs.pswInputValue.value = value.substring(0,this.length)
      return
    }
    this.setState({
      value: this.refs.pswInputValue.value
    })
    if(this.onChange){
      this.onChange(this.refs.pswInputValue.value)
    }
  }
  onFocus(){
    // fix 光标问题
    this.refs.pswInputValue.focus()
    this.refs.pswInputValue.value = this.state.value
  }
  onFocusInput(){
    this.refs.pswCt.className = 'psw-ct onFocus'
  }
  onBlurInput(){
    this.refs.pswCt.className = 'psw-ct onBlur'
  }
  render() {
    const {id}=this.props
    var idName = id || 'short_password_input'
    var doms = [];
    var arr = this.state.value.split('')
    var strLength = arr.length
    for (var i = 0; i < this.length; i++) {
       var classPassword = classnames({'psw-view-value':true, 'has-value':i<strLength})
        doms.push( <span className={classPassword} key={i}></span>)
    }
    return (
      <div className='short-psw-ct'>
        <input className='psw-input-value' onFocus={this.onFocusInput} onBlur={this.onBlurInput} id={idName} type='tel'   ref='pswInputValue' onChange={($event)=>{this.inputChange($event)}} onClick={($event)=>{$event.preventDefault()}}/>
        <div className='psw-ct'  ref='pswCt' onClick= {this.onFocus}>
          {doms}
        </div>
      </div>
    )
  }
}

ShortPassword.propTypes = {
  length: PropTypes.number,
  onChange: PropTypes.func,
  clear: PropTypes.string,
  autoFocus: PropTypes.string,
}
