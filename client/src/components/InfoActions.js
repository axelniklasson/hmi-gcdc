import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/InfoActions'

class InfoActions extends Component {
  constructor(props) {
    super(props)

    // const socket = require('socket.io-client')('http://localhost:3000');
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="circle">

        </div>
      </div>
    )
  }
}

export default CSSModules(InfoActions, styles)