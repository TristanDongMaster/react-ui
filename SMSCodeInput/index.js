import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../../actions/AppActions'
import classnames from 'classnames'
import Input from '../Input'
import '../Input/style.less'
import './style.less'
export default class IdentifyingCodeInput extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        intervalId : null, 
        cnt: 59, 
        btnText: '发送验证码', 
        isReset: false
      }
      this.handleClick = this.handleClick.bind(this)
    
      const { 
        getIdentifyCode ,
        isCounting ,
        handleDisCount,
        isDisabled,
        handleAble,
        handleDisable,
        isStopManual
      } = this.props

      this.getIdentifyCode = getIdentifyCode
      this.isCounting = isCounting
      this.handleDisCount = handleDisCount
      this.handleAble = handleAble
      this.handleDisable = handleDisable
      this.isStopManual = isStopManual
  } 

  componentWillReceiveProps(nextProps) {
    if(nextProps.isCounting&&!this.state.intervalId){
      this.startToCountDown()
    }
    if(nextProps.isStopManual != this.isStopManual){
      this.stopToCountDown()
      var id = this.props.id;
      document.getElementById(id).value = '';
    }
  }

  componentWillUnmount(){
    this.stopToCountDown();
  }

  handleClick(){
    this.handleDisable()
    this.getIdentifyCode()
  }
  startToCountDown(){
    var self = this;
    self.setState({
      btnText: this.state.cnt + '秒后重发'
    })
    self.state.intervalId = setInterval(
      () => {
        self.state.cnt--
        if(self.state.cnt===0){
          self.stopToCountDown()
        }else{
          self.setState({
            btnText: self.state.cnt + '秒后重发'
          })
        }
      }, 1000)
  }

  stopToCountDown(){
    clearInterval(this.state.intervalId)
    this.setState({
        btnText: '重发验证码',
        cnt: 59,
        intervalId: null
    })
    this.handleDisCount()
    this.handleAble()
    
  }

  render() {
    const { writeValue , 
            value , 
            id ,
            isWithTitle,
            isDisabled,
            isCounting,
            blurFn,
            inputFn,
            isStopManual,
          maxLength} = this.props
    this.isStopManual = isStopManual
    var _inputFn = inputFn
    if(typeof inputFn!=='function'){
      _inputFn = () => {}
    }
    return (
      <div className={classnames('ipt-container',{'ipt-container-without-title':!isWithTitle})}>
        <div className="ipt-title">验证码</div>
        <div className="ipt-body">
          <div className="ipt-identify-left">
            <Input 
              value={value}
              type="tel"
              placeholder="输入验证码"
              id={id}
              isError={false}
              writeValue={writeValue}
              inputFn={_inputFn}
              blurFn={blurFn}
              maxLength={maxLength||999}/>
          </div>
          <div className={classnames('ipt-identify-right',{'ipt-identify-right-disabled':isDisabled||isCounting})}>
            <div className="ipt-identify-line"></div>
            <button onClick={this.handleClick}>
              {this.state.btnText}
            </button>
            <div className="ipt-disabled-mask"></div>
          </div>
          
        </div>
      </div>
    )
  }
}

IdentifyingCodeInput.propTypes = {
  id: PropTypes.string.isRequired,
  writeValue: PropTypes.func.isRequired,
  getIdentifyCode: PropTypes.func.isRequired,
  isWithTitle: PropTypes.bool.isRequired,
  isCounting: PropTypes.bool.isRequired,
  handleDisCount: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleAble: PropTypes.func.isRequired,
  handleDisable: PropTypes.func.isRequired,
  inputFn: PropTypes.func,
  blurFn: PropTypes.func,
  isStopManual:PropTypes.string,
  maxLength:PropTypes.number
}












