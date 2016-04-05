import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../styles/App'

import Top from './Top'
import Bottom from './Bottom'

const socket = require('socket.io-client')('http://zeus.axelniklasson.se:4000');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: 0,
      acceleration: 0
    }
  }

  componentDidMount() {
    socket.on('data', (msg) => {
      this.setState({
        speed: msg[7]['value'],
        acceleration: msg[8]['value']
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
