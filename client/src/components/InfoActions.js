import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/InfoActions'

class InfoActions extends Component {
  constructor(props) {
    super(props)

    // const socket = require('socket.io-client')('http://localhost:3000');
  }

  render() {
    var { loading } = this.props;

    if(loading){
      return (
        <div styleName="container">
          <div styleName="circle">
            <div styleName="inner-box">
              <div styleName="text">
                Manual
              </div>
            </div>
          </div>
        </div>
      )
    }else{
       return (
        <div styleName="container">
          <div styleName="circle">
            <div styleName="inner-box">
              <div styleName="text">
                Some information from the system
              </div>
            </div>
          </div>
        </div>
      )
    }

  }
}

export default CSSModules(InfoActions, styles)
