import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/Speed'

class Speed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: 0
    }

    // const socket = require('socket.io-client')('http://localhost:3000');
  }

  // componentDidMount() {
  //   socket.on('data', (msg) => {
  //     this.setState({speed: msg[0]})
  //   })
  // }

  render() {
    return (
      <div styleName="container">
        <div styleName="circle">

        </div>
      </div>
    )
  }
}

export default CSSModules(Speed, styles)
