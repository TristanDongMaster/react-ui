import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './style.less'

export default class TabBankType extends Component {
  constructor(props) {
    super(props)
    const {showTab} = this.props
    this.state = {
      //left
      //right
      leftShow: showTab==='left'
    }
    this.handleLeftClick = this.handleLeftClick.bind(this)
    this.handleRightClick = this.handleRightClick.bind(this)
    this._handleBankItemClick = this._handleBankItemClick.bind(this)
  }
  handleLeftClick(e){
    this.setState({
      leftShow:true
    })
  }
  handleRightClick(e){
    this.setState({
      leftShow:false
    })
  }
  _handleBankItemClick(bankItem){
    const {handleBankItemClick} = this.props
    handleBankItemClick(bankItem)
  }
  render() {
    const {creditCardBankList, savingCardBankList,handleBankItemClick} = this.props
    return (
      <div className="tab-holder">
        <div className="tabs-0">
          <div 
            className={classnames('tab','tab-left',{'active':this.state.leftShow})}
            onClick={this.handleLeftClick}>储蓄卡</div>
          <div 
            className={classnames('tab','tab-right',{'active':!this.state.leftShow})}
            onClick={this.handleRightClick}>信用卡</div>
        </div>
        <div className="tab-content">
          <div className={classnames({'hide':!this.state.leftShow})}>
            <div className="bank-list ">
              {savingCardBankList.map((item,k)=>{
                return (
                  <div  
                    key={k}
                    data-item={JSON.stringify(item)}
                    className="bank-item"
                    onClick={this._handleBankItemClick.bind(null,item)}>
                    {item.bankName}
                  </div>
                )
              })}
            </div>
          </div>
          <div className={classnames({'hide':this.state.leftShow})}>
            <div className="bank-list ">
              {creditCardBankList.map((item,k)=>{
                return (
                  <div  
                    key={k} 
                    data-item={JSON.stringify(item)}
                    className="bank-item" 
                    onClick={this.handleBankItemClick}>
                    {item.bankName}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


TabBankType.propTypes = {
  showTab: PropTypes.string.isRequired,
  creditCardBankList: PropTypes.array.isRequired,
  savingCardBankList: PropTypes.array.isRequired,
  handleBankItemClick: PropTypes.func.isRequired
}











