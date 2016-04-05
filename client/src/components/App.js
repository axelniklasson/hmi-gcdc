import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/App'

import Top from './Top'
import Bottom from './Bottom'

const socket = require('socket.io-client')('http://localhost:3000');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: 0,
      acceleration: 0,
      xCoord: 0,
      yCoord: 0
    }
  }

  componentDidMount() {
    socket.on('data', (msg) => {
      this.setState({
        speed: msg[0],
        acceleration: msg[1],
        xCoord: msg[2],
        yCoord: msg[3]
      })
    })
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="top">
          <Top />
        </div>
        <div styleName="bottom">
          <Bottom speed={this.state.speed} acceleration={this.state.acceleration} />
        </div>
      </div>
    )
  }
}

export default CSSModules(App, styles)
