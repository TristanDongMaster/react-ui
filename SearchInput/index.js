import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../../actions/AppActions'
import classnames from 'classnames'
import Input from '../Input'
import validate from '../util/validate'
export default class SearchInput extends Component {
  constructor(props) {
      super(props);
      this.changeSearchIpt = this.changeSearchIpt.bind(this);
      const { 
            id,
            placeholder,
            isError,
            writeValue,
            searchBtnId,
            handleSearch
          } = this.props;
      this.writeValue = writeValue;
      this.handleSearch = handleSearch;
  } 

  changeSearchIpt(val){
    var searchValue = val.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    var checkted = validate.onlyChn(searchValue);
    if(checkted.result){
      this.writeValue(searchValue);
      this.handleSearch(searchValue);
    }
    
  }

  render() {
    const { 
            id,
            placeholder,
            isError,
            writeValue,
            searchBtnId,
            handleSearch
          } = this.props
    return (
          <div className="ipt-search">
            <Input 
              id={id} 
              type="text" 
              placeholder={placeholder}
              isError={isError}
              writeValue={this.changeSearchIpt}/>
            <i className="icon-search" />
            <a className="btn-box btn-search" onClick={handleSearch}>搜索</a>
          </div>
    )
  }
}

SearchInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  writeValue: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
}